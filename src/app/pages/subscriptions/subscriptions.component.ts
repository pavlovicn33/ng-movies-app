import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SubscriptionModalComponent } from 'src/app/components/subscription-modal/subscription-modal.component';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/shared/services/auth/auth.service';
import { SubscriptionsService } from 'src/shared/services/subscriptions/subscriptions.service';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss'],
})
export class SubscriptionsComponent implements OnInit {
  currencies: any[] = [
    { viewValue: '€ Euro', code: 'eur', value: '€' },
    { viewValue: '£ Pound', code: 'gbp', value: '£' },
    { viewValue: '$ Dollar', code: 'usd', value: '$' },
  ];
  selectedCurrency = this.currencies[0];
  subscriptions: any[] = [];
  exchangeRates: any;
  constructor(
    private authService: AuthService,
    private matDialog: MatDialog
  ) {
    this.subscriptions = [
      {
        name: 'Free',
        price: 0.0,
        code: 1,
        attrs: [
          'Streaming Library with thousands of TV episodes and movies',
          'Most new episodes the day after they air',
          'Watch on your TV, laptop, phone, or tablet',
          'Watch on 2 different screens at the same time',
        ],
      },
      {
        name: 'Basic',
        price: 7.99,
        code: 2,
        attrs: [
          'Streaming Library with thousands of TV episodes and movies',
          'Most new episodes the day after they air',
          'Watch on your TV, laptop, phone, or tablet',
          'Watch on 2 different screens at the same time',
          'No ads in streaming library',
          'Download and watch',
        ],
      },
      {
        name: 'Yearly',
        price: 66.5,
        code: 3,
        attrs: [
          'Streaming Library with thousands of TV episodes and movies',
          'Most new episodes the day after they air',
          'Watch on your TV, laptop, phone, or tablet',
          'Watch on 2 different screens at the same time',
          'No ads in streaming library',
          'Download and watch',
        ],
      },
    ];
  }

  ngOnInit(): void {
    this.getCurrency();
  }

  currencyChange(event: any) {
    this.resetSubscriptionPrice();
    let selected = event.value.code.toUpperCase();
    let exhangeCurrency = Object.entries(this.exchangeRates.data);
    exhangeCurrency.forEach((el: any) => {
      if (selected == el[0]) {
        this.subscriptions.forEach((element) => {
          element.price = (element.price * Number(el[1])).toFixed(2);
        });
      }
    });
  }

  getCurrency() {
    this.authService.getCurrency().subscribe((data: any) => {
      this.exchangeRates = data;
    });
  }

  openPurchaseModal(event: any) {
    const dialogRef = this.matDialog.open(SubscriptionModalComponent, {
      hasBackdrop: true,
      data: {
        subscription: event,
      },
    });
  }



  createToken(card: any, stripe: any) {
    // stripe.createToken(card).then((result:any)=>{
    //   if (result.error) {
    //     // Inform the user if there was an error
    //     var errorElement = document.getElementById('card-errors');
    //     errorElement!.textContent = result.error.message;
    //   }else if (this.email == '' || this.phoneNumber == '' || this.cardHolder == ''){
    //     var errorElement = document.getElementById('card-errors');
    //     errorElement!.textContent = "All fields are required";
    //   }else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)){
    //     var errorElement = document.getElementById('card-errors');
    //     errorElement!.textContent = "Email is not valid";
    //   }else if (/[a-zA-Z]/.test(this.phoneNumber) == true){
    //     var errorElement = document.getElementById('card-errors');
    //     errorElement!.textContent = "Phone number is not valid";
    //   } else {
    //     var errorElement = document.getElementById('card-errors');
    //     errorElement!.textContent = "";
    //     this.submitting = true
    //     this.stripeTokenHandler(result.token);
    //   }
    // });
  }

  mountCards() {
    // const style = {
    //   base: {
    //     color: '#32325d',
    //     fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
    //     fontSmoothing: 'antialiased',
    //     fontSize: '16px',
    //     '::placeholder': {
    //       color: '#aab7c4'
    //     }
    //   },
    //   invalid: {
    //     color: '#fa755a',
    //     iconColor: '#fa755a'
    //   }
    // };
    // const stripe = Stripe(this.stripeKey)
    // const elements = stripe.elements()
    // const card = elements.create('card', { style: style });
    // card.mount('#card-element');
    // card.addEventListener('change', (event: any) => {
    //   var displayError = document.getElementById('card-errors');
    //   if (event.error) {
    //     displayError!.textContent = event.error.message;
    //   } else {
    //     displayError!.textContent = '';
    //   }
    // });
    // var form = document.getElementById('payment-form') as HTMLFormElement;
    // form.addEventListener('submit',(event)=>{
    // event.preventDefault();
    // this.createToken(card,stripe);
    // });
  }

  getTransaction(customerId: string, body: URLSearchParams) {
    // this.subscriptionService.postStripeTransaction(customerId,body).subscribe((data:any)=>{
    //   this.transactionId = data.id
    //   let dateTime = new Date().toISOString()
    //   let paymentForm = new Payment({
    //     StripeCustomerId: this.customerId,
    //     StripeTransactionId: this.transactionId,
    //     SubscriptionType: this.subscription.value,
    //     StripeToken: this.stripeToken,
    //     Email: this.email,
    //     CardHolder:this.cardHolder,
    //     SubscriptionPeriod:"Monthly",
    //     StripeKey:this.stripeKey,
    //     Currency:this.currency.code,
    //     Phone:this.phoneNumber
    //   })
    //   this.sendPayment(paymentForm)
    // }
    // )
  }

  // sendPayment(form:Payment){
  // this.subscriptionService.sendPayment(form).subscribe((data:any)=>{
  // },error => {
  //   if (error.status == 200) {
  //     this.toasterService.displayMessage('success','',`Subscription Successfull`)
  //   }
  //   this.displayModal = false
  //   this.submitting = false
  //   this.resetForm()
  //   if(error.error == 'This value must be greater than or equal to 1.'){
  //     this.toasterService.displayMessage('info','Subscription Failed' , 'User already has a higher subscription')
  //   }
  // })
  // }

  resetSubscriptionPrice() {
    this.subscriptions = [
      {
        name: 'Free',
        price: 0.0,
        code: 1,
        attrs: [
          'Streaming Library with thousands of TV episodes and movies',
          'Most new episodes the day after they air',
          'Watch on your TV, laptop, phone, or tablet',
          'Watch on 2 different screens at the same time',
        ],
      },
      {
        name: 'Basic',
        price: 7.99,
        code: 2,
        attrs: [
          'Streaming Library with thousands of TV episodes and movies',
          'Most new episodes the day after they air',
          'Watch on your TV, laptop, phone, or tablet',
          'Watch on 2 different screens at the same time',
          'No ads in streaming library',
          'Download and watch',
        ],
      },
      {
        name: 'Yearly',
        price: 66.5,
        code: 3,
        attrs: [
          'Streaming Library with thousands of TV episodes and movies',
          'Most new episodes the day after they air',
          'Watch on your TV, laptop, phone, or tablet',
          'Watch on 2 different screens at the same time',
          'No ads in streaming library',
          'Download and watch',
        ],
      },
    ];
  }
}
