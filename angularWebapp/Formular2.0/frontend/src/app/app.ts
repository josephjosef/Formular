import { Component, effect, inject, Signal, signal, WritableSignal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InputArea } from './input-area/input-area';
import { TicketList } from './ticket-list/ticket-list';
import { Formular, FormularService } from './formular-service';
import { finalize, Observable, tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  imports: [RouterModule, InputArea, TicketList],
  template:/*Html*/ `
  <main>
    <section class="brand-name">
      <img class="brand-logo" src="/Pflanzen-Koelle-Logo-gruen.jpg" alt="logo" style="width:220px;height:140px">
    </section>
    <h2 style="font-size: xx-large; margin-left: 760px">Kontaktieren sie uns</h2>
    <section class="content">
      <app-input-area></app-input-area>
      <app-ticket-list [aLength] = arrayLength ></app-ticket-list>
    </section>
  </main>
  `,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Formular2.0');
  formularService = inject(FormularService);
  formularList!: Observable<Formular[]>;
  arrayLength: number = 0

  constructor() {
    effect(() => {
      if (this.formularService.sendFormularBool()) {
        this.formularList = this.formularService.getAllFormulare().pipe(
          tap((fList: Formular[]) => {
            this.formularService.formularListSignal.set(fList);
            console.log(this.formularService.formularListSignal());
            this.arrayLength = fList.length
          }),
          tap({ complete: () => this.formularService.sendFormularBool.set(false) })
        );
        this.formularList.subscribe();
      }
    });
  }
}