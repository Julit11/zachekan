import {AbstractControl, ValidatorFn} from '@angular/forms';

export function decimalPlacesValidator(decimalPlaces: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const amount = +control.value;
    let error;

    if (!isNaN(amount)) {
      let curDecimalPlaces: any = amount.toString().split('.')[1];

      if (curDecimalPlaces !== undefined) {
        curDecimalPlaces = curDecimalPlaces.length;

        if (curDecimalPlaces > decimalPlaces) {
          error = {};

          let exp = 10;
          let i = 1;

          while (i < decimalPlaces) {
            exp = exp * 10;
            i++;
          }

          error.recommended1 = Math.floor(amount * exp) / exp;
          error.recommended2 = Math.ceil(amount * exp) / exp;
        }
      }
    }
    return !error ? null : {decimalPlaces: error};
  };
}
