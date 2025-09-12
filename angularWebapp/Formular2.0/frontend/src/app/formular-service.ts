import { Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormularService {
  private url = 'http://localhost:3000/api/formular';
  formular!: Formular
  sendFormularBool: WritableSignal<boolean> = signal(false)
  formularSuccessfullySent: WritableSignal<boolean> = signal(false)

  constructor(private http: HttpClient) {}

  addFormular(formular: Formular) {
    console.log("formularService add")
    return this.http.post(`${this.url}/postFormular`, formular);
  }

  getAllFormulare(): Observable<Formular[]> {
    return this.http.get<Formular[]>(`${this.url}/getFormulare`)
  }

  submitFormular() {
    this.addFormular(this.formular).subscribe({
      next: (res) => {
        this.formularSuccessfullySent.set(true)
      },
      error: (err) => {
        this.formularSuccessfullySent.set(false)
        throw new Error("Formular konnte nicht gesendet werden")
      }
    });
  }
}

export interface Formular {
    id?: number;
    firstName: string | null | undefined;
    lastName: string | null | undefined;
    email: string | null | undefined;
    birthday: string | null | undefined;
    comment: string | null | undefined;
}