import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  onlyOneSelectedValidator(keys: string[]): ValidatorFn {
    return (control: AbstractControl) : ValidationErrors | null => {
      const value = control.value

      if (!value) { return null }
      let onlyOneValue = false
      for (let key of keys) {
        const convertedKey = key[0].toLowerCase() + key.slice(1)
          if (value[convertedKey]) {
              if (onlyOneValue) {
                  onlyOneValue = !onlyOneValue
                  break
              }
              onlyOneValue = value[convertedKey]
          }
      }

      return !onlyOneValue ? { validation: true } : null
    }
  }
}
