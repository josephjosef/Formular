import { Component, inject, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormularService } from '../formular-service';
import { Formular } from '../formular-service';
import { Observable } from 'rxjs';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input-area',
  imports: [ReactiveFormsModule],
  standalone: true,
  template: /*Html*/ `
    <section class="input-container">
      <form [formGroup]="inputData" (submit)="submitFormular()" class="form">
        <h2>Contact us</h2>
        <label for="firstNameInput">Firstname:</label><br>
        <input name="firstNameInput" id="firstNameInput" type="text" formControlName="firstName"><br><br>

        <label for="lastNameInput">Lastname:</label><br>
        <input name="lastNameInput" id="lastNameInput" type="text" formControlName="lastName"><br><br>

        <label for="emailInput">Email:</label><br>
        <input name="emailInput" id="emailInput" type="text" formControlName="email"><br><br>

        <label for="birthdayInput">Birthday:</label><br>
        <input name="birthdayInput" id="birthdayInput" type="date" formControlName="birthday"><br><br>

        <label for="commentField">Enter your comment:</label><br>
        <textarea name="commentField" id="commentField" formControlName="comment"></textarea><br><br>

        <button id="submitButton" type="submit">Send</button>

      </form>
    </section>
  `,
  styleUrl: './input-area.css'
})
export class InputArea {
  formularService = inject(FormularService)
  @Output() newItemEvent = new EventEmitter<Formular>();

  inputData = new FormGroup({
    firstName: new FormControl(""),
    lastName: new FormControl(""),
    birthday: new FormControl(""),
    comment: new FormControl(""),
    email: new FormControl("")
  })

  submitFormular() {
    try {
      const firstName = this.inputData.value.firstName
      const lastName = this.inputData.value.lastName
      const email = this.inputData.value.email
      const birthday = this.inputData.value.birthday
      const comment = this.inputData.value.comment

      const formular: Formular = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        birthday: birthday,
        comment: comment
      }
      console.log(formular)
      this.addNewFormular(formular)
      //this.sendFormular(formular)

    } catch (error) {
      console.log("fehler", error)
    }
  }

  addNewFormular(formular: Formular) {
    this.newItemEvent.emit(formular)
  }
}