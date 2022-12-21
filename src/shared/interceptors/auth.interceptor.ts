import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { SpinnerService } from '../services/spinner/spinner.service';
import { debounce } from 'lodash';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private spinnerService: SpinnerService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.spinnerService.requestStarted();
    return this.handle(next,request);
  }

  handle(next: any, request: any) {
    if (request.url.includes('no-spinner')) {
      this.spinnerService.requestEnded()
    }
    return next.handle(request).pipe(
      tap((event: any) => {
        if (event instanceof HttpResponse) {
          setTimeout(() => {
            this.spinnerService.requestEnded();
          }, 50);
        }
      }, (error:HttpErrorResponse) => {
        this.spinnerService.resetSpinner()
        throw error
      })
      );
    }
    }
