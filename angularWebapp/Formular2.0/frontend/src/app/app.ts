import { Component, effect, inject, signal, input, WritableSignal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InputArea } from './input-area/input-area';
import { TicketList } from './ticket-list/ticket-list';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Formular, FormularService } from './formular-service';
import { Observable, pipe, takeUntil } from 'rxjs';
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

  /*constructor(){
    effect(() => {
      if (this.receivedFormular()) {
        this.formularList = this.formularService.getAllFormulare().pipe(
          this.receivedFormular.set(false)
        ).subscribe()
      }
    })
  }*/

  formularService = inject(FormularService)
  formular!: Formular;
  receivedFormular: WritableSignal<boolean> = signal(false)
  formularList!: Observable<Formular[]>

  addFormular(newFormular: Formular) {
    try {
      this.formular = newFormular
      this.sendFormular()
      this.receivedFormular.set(true)
    } catch (error) {
      window.alert("Formular konnte nicht gesendet werden. Bitte versuche es später nochmal")
    }
  }

  sendFormular() {
    this.formularService.addFormular(this.formular).subscribe({
      next: (res) => {
        window.alert("Formular gesendet")
        this.formularList = this.formularService.getAllFormulare()
      },
      error: (err) => {
        window.alert("Ein Fehler ist aufgekommen. Bitte versuche es später erneut")
        throw new Error("Formular konnte nicht gesendet werden")
      }
    });
  }
}
