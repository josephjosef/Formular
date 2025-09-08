import { Component, inject } from '@angular/core';
import { InputArea } from '../input-area/input-area';
import { GetTickets } from '../get-tickets';
import { Formular } from '../get-tickets';

@Component({
  selector: 'app-ticket-list',
  imports: [InputArea],
  standalone: true,
  template: /*Html*/`
    <section class="list-container">
      @for(formular of formulare; track formular.id) {
        <div class="ticketss">
          <p style="color: red;"><b>{{formular.id}}:</b></p>
          <label><b>Vorname: </b>{{formular.firstName}}</label>
          <br>
          <label><b>Nachname: </b>{{formular.lastName}}</label>
          <br>
          <label><b>Email: </b>{{formular.email}}</label>
          <br>
          <label><b>Geburtstag: </b>{{formular.birthday}}</label>
          <br>
          <label><b>Kommentar: </b>{{formular.comment}}</label>
        </div>
    }
    </section>
  `,
  styleUrl: './ticket-list.css'
})
export class TicketList {
  getTickets = inject(GetTickets)
  formulare: Formular[] = this.getTickets.getFormulare()
}
