import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormularService {
  private url = 'http://localhost:3000/api/formular';

  constructor(private http: HttpClient) {}

  addFormular(formular: Formular) {
    console.log("formularService add")
    return this.http.post(`${this.url}/postFormular`, formular);
  }

  getAllFormulare(): Observable<Formular[]> {
    return this.http.get<Formular[]>(`${this.url}/getFormulare`)
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