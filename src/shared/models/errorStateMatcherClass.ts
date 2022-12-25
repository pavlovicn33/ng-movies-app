import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): any {
    if (control?.touched) {
      const invalidCtrl = !!(control?.invalid && control?.parent?.dirty);
      const invalidParent = !!(
        control?.parent?.invalid && control?.parent?.dirty
      );
      if (control.parent) {
        return (
          control.parent.errors &&
          control.parent.errors &&
          control.touched &&
          (invalidCtrl || invalidParent)
        );
      }
      return false;
    }
    return false;
  }
}
