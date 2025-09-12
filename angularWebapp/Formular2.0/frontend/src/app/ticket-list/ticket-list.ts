import { Component, computed, inject, input, Signal, WritableSignal } from '@angular/core';
import { FormularService } from '../formular-service';
import { Formular } from '../formular-service';
import { AsyncPipe } from '@angular/common';
import { MatCard } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table'
import { Observable } from 'rxjs';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-ticket-list',
  imports: [AsyncPipe, MatCard, MatIconModule, MatTableModule, RouterModule, RouterOutlet, RouterLink],
  templateUrl: './ticket-list.html',
  styleUrl: './ticket-list.css'
})
export class TicketList {
  formularService = inject(FormularService)
  aLength = input<number>()

  checkArrayLength(): boolean {
    if(this.aLength()! > 0) {
      console.log(this.aLength())
      return true
    } else {
      return false
    }
  }

  get dataSource(): Formular[] {
    return this.formularService.formularListSignal();
  }

  displayedColumns: string[] = ["id", "firstName", "lastName", "email", "birthday", "comment"];
}
