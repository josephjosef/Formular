import { Component, inject } from '@angular/core';
import { InputArea } from '../input-area/input-area';
import { FormularService } from '../formular-service';
import { Formular } from '../formular-service';

@Component({
  selector: 'app-ticket-list',
  imports: [InputArea],
  standalone: true,
  template: /*Html*/`
    <section class="list-container">
      <!--@for(formular of formulare; track formular.id) {
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
    }-->
    </section>
  `,
  styleUrl: './ticket-list.css'
})
export class TicketList {
  formularService = inject(FormularService)
 // formulare: Formular[] = this.formularService.getFormulare()
}
