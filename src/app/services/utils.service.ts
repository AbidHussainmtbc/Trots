import { Injectable } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';
import { errorsEnum } from '../enums/errors.enum';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})

export class UtilsService {
  scaleRatio;
  
  static getErrorMsg(formControl: AbstractControl, customError = {}): string {
    const errors = formControl.errors;
    let error = '';
    let hasError;
    if (errors) {
      hasError = Object
        .keys(errors)
        .some(errorKey => {
          if (errors[errorKey]) {
            error = customError[errorKey] || errorsEnum[errorKey] || 'Invalid value';

            return true;
          }
        });
    }

    return hasError ? error : '';
  }

  constructor(
    private toastService: ToastService
  ) {
  }

  validateAllFormFields(formGroup?: FormGroup): void {
    Object
      .keys(formGroup.controls)
      .forEach(field => {
        const control = formGroup.get(field);

        if (control instanceof FormControl) {
          if (typeof control.value === 'string') {
            control.setValue(control.value.trim());
          }

          control.markAsDirty({onlySelf: true});
        } else if (control instanceof FormGroup) {
          this.validateAllFormFields(control);
        } else if (control instanceof FormArray) {
          control.controls.forEach(ctrl => {
            if (ctrl instanceof FormControl) {
              if (typeof ctrl.value === 'string') {
                ctrl.setValue(ctrl.value.trim());
              }

              ctrl.markAsDirty({onlySelf: true});
            } else if (ctrl instanceof FormGroup) {
              this.validateAllFormFields(ctrl);
            }
          });
        }
      });
  }
}
