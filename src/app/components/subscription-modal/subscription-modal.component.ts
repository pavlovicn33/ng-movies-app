import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { SubscriptionsService } from 'src/shared/services/subscriptions/subscriptions.service';

@Component({
  selector: 'app-subscription-modal',
  templateUrl: './subscription-modal.component.html',
  styleUrls: ['./subscription-modal.component.scss'],
})
export class SubscriptionModalComponent implements OnInit {
  paymentForm: FormGroup;
  customerId: string = '';
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private subscriptionService: SubscriptionsService
  ) {
    this.paymentForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      cardHolder: ['', [Validators.required]],
      phoneNmber: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.mountCards()
  }

  get p() {
    return this.paymentForm.controls;
  }

  mountCards() {
    const style = {
      base: {
        color: '#32325d',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    };

    const stripe = Stripe(environment.stripeTestKey);
    const elements = stripe.elements();
    const card = elements.create('card', { style: style });
    card.mount('#card-element');

    card.addEventListener('change', (event: any) => {
      var displayError = document.getElementById('card-errors');
      if (event.error) {
        displayError!.textContent = event.error.message;
      } else {
        displayError!.textContent = '';
      }
    });

    var form = document.getElementById('payment-form') as HTMLFormElement;
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      // this.createToken(card,stripe); 
    });
  }

  getStripeCustomer(form: FormData) {
    this.subscriptionService.getStripeCustomer(form).subscribe((data: any) => {
      this.customerId = data.id;
      let body = new URLSearchParams();
      // body.set('amount', this.price);
      // body.set('currency', this.currency.code);
      // this.getTransaction(this.customerId, body)
    });
  }

  stripeTokenHandler() {
    let form = new FormData();
    form.append('description', 'description..');
    form.append('source', environment.stripeTestKey);
    this.getStripeCustomer(form);
  }
}
