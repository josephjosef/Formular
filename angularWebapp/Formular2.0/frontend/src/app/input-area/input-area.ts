import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormularService } from '../formular-service';
import { Formular } from '../formular-service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormField, MatError, MatLabel, MatHint } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DateAdapter, MatNativeDateModule } from '@angular/material/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { forbiddenCharacterValidator } from '../customValidatoren';
import { MatDialog } from '@angular/material/dialog';
import { Dialog } from '../dialog/dialog';

@Component({
  selector: 'app-input-area',
  imports: [ReactiveFormsModule, MatDatepickerModule, MatFormField, MatLabel, MatHint, MatError, MatInputModule, MatNativeDateModule,
    MatButton, MatButtonModule],
  providers: [MatDatepickerModule],
  templateUrl: './input-area.html',
  styleUrl: './input-area.css'
})
export class InputArea implements OnInit {
  readonly dialog = inject(MatDialog);
  formular!: Formular;
  private readonly _currentYear = new Date().getFullYear();
  readonly minDate = new Date(this._currentYear - 100, 0, 1);
  readonly maxDate = new Date()
  formularService = inject(FormularService)

  constructor(private dateAdapter: DateAdapter<any>) {}
  
  inputData = new FormGroup({
    firstName: new FormControl("", [
      Validators.required,
      forbiddenCharacterValidator()
    ]),
    lastName: new FormControl("", [
      Validators.required,
      forbiddenCharacterValidator()
    ]),
    birthday: new FormControl("", [
      Validators.required,
    ]),
    comment: new FormControl("", [
      Validators.required
    ]),
    email: new FormControl("", [
      Validators.required,
      Validators.email
    ])
  })

  ngOnInit() {
    this.localeToGermany()
  }

  localeToGermany() {
    this.dateAdapter.setLocale('de');
  }

  submitFormular() {
    try {
      const firstName = this.inputData.value.firstName
      const lastName = this.inputData.value.lastName
      const email = this.inputData.value.email
      const birthday = this.inputData.value.birthday
      const comment = this.inputData.value.comment
      const birthdayDate = this.convertDate(birthday!)

      this.formular = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        birthday: birthdayDate,
        comment: comment
      }

    } catch (error) {
      console.log("fehler", error)
    }
  }

  convertDate(date: string): string {
    const birthdayDate = new Date(date)
    const birthdayYear = birthdayDate.getFullYear()
    const birthdayMonth = birthdayDate.getMonth() + 1
    const birthdayDay = birthdayDate.getDay()
    return `${birthdayDay}.${birthdayMonth}.${birthdayYear}`
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.submitFormular()
    this.dialog.open(Dialog, {
      data: { formular: this.formular },
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  checkInputsValidation(): boolean {
    const controls = this.inputData.controls
    if (
      controls['firstName'].hasError('required') || controls['lastName'].hasError('required') ||
      controls['email'].hasError('required') || controls['birthday'].hasError('required') ||
      controls['comment'].hasError('required') || controls['firstName'].hasError('forbiddenName') ||
      controls['lastName'].hasError('forbiddenName') || controls['email'].hasError('email')
      ) {
        return false
      }
      return true
  }
}