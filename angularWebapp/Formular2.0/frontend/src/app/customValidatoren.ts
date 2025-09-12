import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function forbiddenCharacterValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    const forbiddenValue = control.value

    const regexPattern = /^[a-zäöüßA-ZÄÖÜß]+$/
    const isValid = regexPattern.test(forbiddenValue)

    if (isValid) {
      return null
    } else {
      return forbiddenValue? {forbiddenName: {value: control.value}} : null;
    }
  };
}