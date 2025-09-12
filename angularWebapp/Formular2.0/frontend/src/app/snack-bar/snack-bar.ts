import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarLabel, MatSnackBarActions, MatSnackBarAction, MatSnackBarRef } from '@angular/material/snack-bar';
import { FormularService } from '../formular-service';

@Component({
  selector: 'app-snack-bar',
  imports: [MatButtonModule, MatSnackBarLabel, MatSnackBarActions, MatSnackBarAction],
  templateUrl: './snack-bar.html',
  styleUrl: './snack-bar.css'
})
export class SnackBar {
  snackBarRef = inject(MatSnackBarRef);
  formularService = inject(FormularService)
  formularSent = signal(this.formularService.formularSuccessfullySent)
}
