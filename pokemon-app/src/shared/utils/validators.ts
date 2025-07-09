import {AbstractControl, ValidationErrors, Validators as _Validators} from '@angular/forms'

export class Validators extends _Validators {
  static isNotBlank(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (typeof value === 'string' && value.trim().length === 0) {
      return {isNotBlank: true};
    }
    return null;
  }
}
