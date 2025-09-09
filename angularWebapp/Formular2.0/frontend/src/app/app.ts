import { Component, effect, inject, signal, input, WritableSignal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InputArea } from './input-area/input-area';
import { TicketList } from './ticket-list/ticket-list';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Formular, FormularService } from './formular-service';
import { Observable } from 'rxjs';
import { Signal } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [RouterModule, InputArea, TicketList],
  template:/*Html*/ `
  <main>
    <section class="brand-name">
      <img class="brand-logo" src="/Pflanzen-Koelle-Logo-gruen.jpg" alt="logo" style="width:100px;height:60px">
      <h1 class="logo-name">Pflanzen Kölle</h1>
    </section>
    <section class="content">
      <app-input-area (newItemEvent)="addFormular($event)"></app-input-area>
      <app-ticket-list [receivedFormularList] = formularList ></app-ticket-list>
    </section>
  </main>
  `,
  styleUrl: './app.css'
})
export class App {
protected readonly title = signal('Formular2.0');

constructor(){
  effect(() => {
      if (this.receivedFormular()) {
        this.formularList = this.formularService.getAllFormulare()
        console.log("receivedFormular bevor false setzen: ", this.receivedFormular())
        this.receivedFormular.set(false)
        console.log("receivedFormular nach false setzen: ", this.receivedFormular())
        console.log("formularList: ", this.formularList)
      }
    })
}

  formularService = inject(FormularService)
  formular!: Formular;
  receivedFormular: WritableSignal<boolean> = signal(false)
  formularList!: Observable<Formular[]>

  addFormular(newFormular: Formular) {
    this.formular = newFormular
    console.log("PARENT", newFormular)
    this.sendFormular()
    this.receivedFormular.set(true)
  }

  sendFormular() {
    this.formularService.addFormular(this.formular).subscribe({
      next: (res) => {
        console.log("Observer value", res);
      },
      error: (err) => {
        console.error("Fehler beim Senden des Formulars", err);
      }
    });
  }
}
