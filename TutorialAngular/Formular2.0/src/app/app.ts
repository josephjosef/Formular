import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InputArea } from './input-area/input-area';
import { TicketList } from './ticket-list/ticket-list';
import { RouterOutlet, RouterLink } from '@angular/router';

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
      <app-input-area></app-input-area>
      <app-ticket-list></app-ticket-list>
    </section>
  </main>
  `,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Formular2.0');
}
