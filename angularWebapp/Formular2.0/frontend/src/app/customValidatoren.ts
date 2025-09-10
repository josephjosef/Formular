/*import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function forbiddenDateValidator(birthday: string): ValidatorFn {

    const birthdayDate = new Date(birthday!)
    const today = new Date()

    birthdayDate.setHours(0,0,0,0)
    today.setHours(0,0,0,0)

    if (birthdayDate >= today) {
      this.birthdayInvalid.set(true)
    }

  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = nameRe.test(control.value);
    return forbidden ? {forbiddenName: {value: control.value}} : null;
  };
}*/