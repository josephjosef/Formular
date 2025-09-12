import { Component, computed, inject, input, Signal, WritableSignal } from '@angular/core';
import { FormularService } from '../formular-service';
import { Formular } from '../formular-service';
import { AsyncPipe } from '@angular/common';
import { MatCard } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table'
import { Observable } from 'rxjs';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-ticket-list',
  imports: [AsyncPipe, MatCard, MatIconModule, MatTableModule, RouterModule, RouterOutlet],
  templateUrl: './ticket-list.html',
  styleUrl: './ticket-list.css'
})
export class TicketList {
  formularService = inject(FormularService)
  //receivedFormularList = input<Signal<Formular[]>>()
  receivedFormularList = input<Observable<Formular[]>>()

  /*checkSignalLength(): boolean {
    const array = this.receivedFormularList()
    const arrayLength = array?.length
    if (arrayLength! >= 0) {
      return true
    } else {
      return false
    }
  }*/

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'birthday', 'comment'];
}
