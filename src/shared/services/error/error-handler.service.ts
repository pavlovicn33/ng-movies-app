import { Injectable, ErrorHandler } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService implements ErrorHandler {
  constructor() {}

  handleError(error: unknown) {
    let er = String(error);
    if (
      er == "TypeError: Cannot read properties of undefined (reading 'value')"
    ) {
      return;
    }
    console.log(error);
  }
}
