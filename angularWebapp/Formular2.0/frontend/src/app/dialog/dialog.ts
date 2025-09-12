import { ChangeDetectionStrategy, Component, Inject, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { Formular, FormularService } from '../formular-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBar } from '../snack-bar/snack-bar';

@Component({
  selector: 'app-dialog',
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  templateUrl: './dialog.html',
  styleUrl: './dialog.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dialog {
  constructor (@Inject(MAT_DIALOG_DATA) public data: {formular: Formular}) {}
  readonly dialogRef = inject(MatDialogRef<Dialog>)
  formularService = inject(FormularService)
  _snackBar = inject(MatSnackBar);

  submitSend() {
    this.formularService.sendFormularBool.set(true)
    this.formularService.formular = this.data.formular
    this.formularService.submitFormular()
  }
  cancelSend() {
    this.formularService.sendFormularBool.set(false)
  }
  openSnackBar() {
    this._snackBar.openFromComponent(SnackBar, {
      duration: 2 * 1000,
    });
  }
}
