import { Component, inject, input } from '@angular/core';
import { InputArea } from '../input-area/input-area';
import { FormularService } from '../formular-service';
import { Formular } from '../formular-service';
import { Observable, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-ticket-list',
  imports: [InputArea, AsyncPipe],
  template: /*Html*/`
    <section class="list-container">
      @for(formular of receivedFormularList() | async; track formular.id) {
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
  formularService = inject(FormularService)
  receivedFormularList = input<Observable<Formular[]>>()
}
