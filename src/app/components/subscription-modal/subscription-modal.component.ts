import {
  Component,
  HostListener,
  Inject,
  OnInit,
  ViewChild,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  StripeCardElementOptions,
  StripeElementsOptions,
} from '@stripe/stripe-js';
import { StripeService } from 'ngx-stripe';
import { StripeCardComponent } from 'ngx-stripe';
import { environment } from 'src/environments/environment';
import { Payment } from 'src/shared/models/payment';
import { AuthService } from 'src/shared/services/auth/auth.service';
import { SubscriptionsService } from 'src/shared/services/subscriptions/subscriptions.service';

@Component({
  selector: 'app-subscription-modal',
  templateUrl: './subscription-modal.component.html',
  styleUrls: ['./subscription-modal.component.scss'],
})
export class SubscriptionModalComponent implements OnInit {
  paymentForm: FormGroup;
  customerId: string = '';
  status: boolean = false;
  transactionId: string = '';
  stripeToken: string = '';
  @ViewChild(StripeCardComponent) card!: StripeCardComponent;

  cardOptions: StripeCardElementOptions = {
    classes: {
      base: 'card-input-color',
    },
    style: {
      base: {
        iconColor: '#fafafa',
        color: '#fafafa',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#fafafa',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'en',
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private stripeService: StripeService,
    private subscriptionService: SubscriptionsService,
    private matSnackBar: MatSnackBar,
    private dialogRef: MatDialogRef<SubscriptionModalComponent>,
    private authService: AuthService
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
      phoneNumber: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.setStyle();
  }

  setStyle() {
    if (localStorage.getItem('mode') == 'light') {
      this.cardOptions = {
        classes: {
          base: 'card-input-color',
        },
        style: {
          base: {
            iconColor: '#000000',
            color: '#000000',
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: 'antialiased',
            fontSize: '16px',
            '::placeholder': {
              color: '#000000',
            },
          },
          invalid: {
            color: '#fa755a',
            iconColor: '#fa755a',
          },
        },
      };
    }
  }

  openSnackBar(message: string, action: string) {
    this.matSnackBar.open(message, action, {
      duration: 3000,
    });
  }

  get p() {
    return this.paymentForm.controls;
  }

  createToken(): void {
    var regExp = /[a-zA-Z]/g;
    if (this.p['email'].hasError('required')) {
      return;
    }
    if (this.p['email'].hasError('email')) {
      return;
    }
    if (this.p['email'].hasError('pattern')) {
      return;
    }
    if (this.p['cardHolder'].hasError('required')) {
      return;
    }
    if (this.p['phoneNumber'].hasError('required')) {
      return;
    }
    if (regExp.test(this.p['phoneNumber'].value)) {
      return;
    }
    const name = this.p['cardHolder'].value;
    this.stripeService
      .createToken(this.card.element, { name })
      .subscribe((result) => {
        if (result.token) {
          this.status = true;
          this.stripeToken = result.token.id;
          this.stripeTokenHandler(result.token.id);
        } else if (result.error) {
          this.openSnackBar(String(result.error.message), 'X');
        }
      });
  }

  getStripeCustomer(form: FormData) {
    this.subscriptionService.getStripeCustomer(form).subscribe((data: any) => {
      this.customerId = data.id;
      let body = new URLSearchParams();
      body.set('amount', this.data.subscription.price);
      body.set('currency', this.data.currency.code);
      this.createPayment();
    });
  }

  stripeTokenHandler(params: string) {
    let form = new FormData();
    form.append('description', `${this.data.subscription.name} subscription`);
    form.append('source', params);
    this.getStripeCustomer(form);
  }

  createPayment(): void {
    let priceID = 'price_1MRGacJwD7c1wFyCizlghcG1';
    if (this.data.subscription.name == 'Yearly') {
      priceID = 'price_1MRGbLJwD7c1wFyCmrOkyyos';
    }
    this.stripeService
      .createPaymentMethod({
        type: 'card',
        card: this.card.element,
        billing_details: {
          name: this.p['cardHolder'].value,
          phone: this.p['phoneNumber'].value,
          email: this.p['email'].value,
        },
      })
      .subscribe((result) => {
        if (result.paymentMethod) {
          const pack = {
            paymentMethodId: result.paymentMethod,
            customerID: this.customerId,
            priceID: priceID,
          };
          this.subscriptionService
            .startSubscription(pack)
            .subscribe((res: any) => {
              // this.stripeService
              //   .confirmCardPayment(res.clientSecret, {
              //     payment_method: {
              //       card: this.card.element,
              //       billing_details: {
              //         name: this.p['cardHolder'].value,
              //         phone: this.p['phoneNumber'].value,
              //         email: this.p['email'].value,
              //       },
              //     },
              //   })
              //   .subscribe((data: any) => {
              this.authService.updateSubscription(
                this.data.subscription.name,
                res.subscriptionId
              );
              this.openSnackBar('Subscription Successfull', 'X');
              this.dialogRef.close();
            });
          // });
        } else if (result.error) {
          this.paymentForm.reset();
          this.openSnackBar(String(result.error.message), 'X');
        }
      });
  }
}
