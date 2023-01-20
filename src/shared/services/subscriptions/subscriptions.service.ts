import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionsService {
  constructor(private http: HttpClient) {}

  getStripeCustomer(form: FormData): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${environment.stripeSecretKey}`,
    });
    let options = { headers: headers };
    return this.http.post(`https://api.stripe.com/v1/customers`, form, options);
  }

  postStripeTransaction(
    customerId: string,
    form: URLSearchParams
  ): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${environment.stripeSecretKey}`,
    });
    let options = { headers: headers };
    return this.http.post(
      `https://api.stripe.com/v1/customers/${customerId}/balance_transactions`,
      form,
      options
    );
  }
  startSubscription(data:any) {
    return this.http.post('http://localhost:4242/create-subscription', data);
 }
  webhook(data:any) {
    return this.http.post('http://localhost:4242/webhook', data);
 }
 cancelSubscription(data:any) {
  return this.http.post('http://localhost:4242/cancel-subscription', data);
 }
}
