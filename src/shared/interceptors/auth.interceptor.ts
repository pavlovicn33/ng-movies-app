import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { SpinnerService } from '../services/spinner/spinner.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private spinnerService: SpinnerService) {}
  private totalRequests = 0;

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (
      request.url.includes('no-spinner') ||
      request.url.includes('assets/svg-country-flags')
    ) {
      this.spinnerService.setLoading(false);
      return next.handle(request);
    }
    this.totalRequests++;
    this.spinnerService.setLoading(true);
    return next.handle(request).pipe(
      finalize(() => {
        this.totalRequests--;
        if (this.totalRequests == 0) {
          this.spinnerService.setLoading(false);
        }
      })
    );
  }
}
