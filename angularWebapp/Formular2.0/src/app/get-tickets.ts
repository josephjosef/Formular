import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetTickets {
  formulare: Formular[] = []

  addFormular(formular: Formular) {
    formular.id = this.formulare.length
    this.formulare.push(formular)
  }

  getFormulare(): Formular[] {
    return this.formulare
  }
}

export interface Formular {
  id?: number
  firstName: string| null | undefined,
  lastName: string| null | undefined,
  email: string| null | undefined,
  birthday: string| null | undefined,
  comment: string| null | undefined,
}