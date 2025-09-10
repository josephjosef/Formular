import { Component, inject, input, output, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormularService } from '../formular-service';
import { Formular } from '../formular-service';
import { Observable } from 'rxjs';
import { Output, EventEmitter } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormField } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { MatHint } from '@angular/material/form-field';

@Component({
  selector: 'app-input-area',
  imports: [ReactiveFormsModule, MatDatepickerModule, MatFormField, MatLabel, MatHint],
  standalone: true,
  template: /*Html*/ `
    <section class="input-container">
      <form [formGroup]="inputData" (submit)="submitFormular()" class="form">
        <h2>Kontaktieren sie uns</h2>
        <label for="firstNameInput">Vorname:</label><br>
        <input name="firstNameInput" id="firstNameInput" type="text" formControlName="firstName" required>

        @if(inputData.controls['firstName'].hasError('required')) {
          <label style="color: red">Vorname ungültig</label><br><br>
        }
        @else {
          <br><br>
        }

        <label for="lastNameInput">Nachname:</label><br>
        <input name="lastNameInput" id="lastNameInput" type="text" formControlName="lastName">

        @if(inputData.controls['lastName'].hasError('required')) {
          <label style="color: red">Nachname ungültig</label><br><br>
        }
        @else {
          <br><br>
        }

        <label for="emailInput">Email:</label><br>
        <input name="emailInput" id="emailInput" type="text" formControlName="email">

        @if(inputData.controls['email'].hasError('required') || inputData.controls['email'].hasError('email')) {
          <label style="color: red">Email ungültig</label><br><br>
        }
        @else {
          <br><br>
        }

        <label for="birthdayInput">Birthday:</label><br>
        <input name="birthdayInput" id="birthdayInput" type="date" formControlName="birthday">

        @if(inputData.controls['birthday'].hasError('required')) {
          <br><label style="color: red">Geburtstag ungültig</label><br><br>
        }
        @else {
          <br><br>
        }

        <label for="commentField">Kommentar eingeben:</label><br>
        <textarea name="commentField" id="commentField" formControlName="comment"></textarea><br><br>

        <button id="submitButton" type="submit">Absenden</button>

      </form>
    </section>
  `,
  styleUrl: './input-area.css'
})
export class InputArea {
  formularService = inject(FormularService)
  newItemEvent = output<Formular>()

  inputData = new FormGroup({
    firstName: new FormControl("", [
      Validators.required
    ]),
    lastName: new FormControl("", [
      Validators.required
    ]),
    birthday: new FormControl("", [
      Validators.required,
      //forbiddenDateValidator()
    ]),
    comment: new FormControl("", [
      Validators.required
    ]),
    email: new FormControl("", [
      Validators.required,
      Validators.email
    ])
  })

  private readonly _currentYear = new Date().getFullYear();
  readonly minDate = new Date(this._currentYear - 20, 0, 1);
  readonly maxDate = new Date(this._currentYear + 1, 11, 31);

  firstNameInvalid: WritableSignal<boolean> = signal(false)
  lastNameInvalid: WritableSignal<boolean> = signal(false)
  emailInvalid: WritableSignal<boolean> = signal(false)
  birthdayInvalid: WritableSignal<boolean> = signal(false)
  emptyFields: WritableSignal<boolean> = signal(false)

  submitFormular() {
    try {
      const firstName = this.inputData.value.firstName
      const lastName = this.inputData.value.lastName
      const email = this.inputData.value.email
      const birthday = this.inputData.value.birthday
      const comment = this.inputData.value.comment
      
      this.checkInput(firstName, lastName, email, birthday, comment)

      const formular: Formular = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        birthday: birthday,
        comment: comment
      }
      console.log(formular)
      this.addNewFormular(formular)

    } catch (error) {
      console.log("fehler", error)
    }
  }

  addNewFormular(formular: Formular) {
    this.newItemEvent.emit(formular)
  }

  checkInput(firstName: string | null | undefined, lastName: string | null | undefined, email: string | null | undefined,
    birthday: string | null | undefined, comment: string | null | undefined) {

      const birthdayDate = new Date(birthday!)
      const today = new Date()

      this.firstNameInvalid.set(false)
      this.lastNameInvalid.set(false)
      this.emailInvalid.set(false)
      this.birthdayInvalid.set(false)
      this.emptyFields.set(false)

      if (firstName == "" || lastName == "" || email == "" || birthday == "" || comment == "") {
        this.emptyFields.set(true)
      } else {

        if (!firstName!.match(/^[a-zäöüßA-ZÄÖÜß]+$/)) {
          this.firstNameInvalid.set(true)
        }
        if (!lastName!.match(/^[a-zäöüßA-ZÄÖÜß]+$/)) {
          this.lastNameInvalid.set(true)
        }
        if (!email!.match(/^[a-zäöüßA-ZÄÖÜß0-9@._-]+$/)) {
          this.emailInvalid.set(true)

        } else {
          const emailArray = email!.split("");
          let positionEtt = -1
          let positionDot = -1

          for (let index = 0; index < emailArray.length; index++) {
              const element = emailArray[index];
              if (element === "@") {
                  positionEtt = index
              }
              if (element === ".") {
                  positionDot = index
              }
          }

          if (positionEtt == -1 || positionDot == -1 || Math.abs(positionEtt - positionDot) <= 5) {
            this.emailInvalid.set(true)
          }
        }
        if (birthdayDate >= today) {
          this.birthdayInvalid.set(true)
        }
      }

      if (this.firstNameInvalid() || this.lastNameInvalid() || this.emailInvalid() || this.birthdayInvalid() || this.emptyFields()) {
        throw new Error("Eingabe ungültig")
      }
  }
}