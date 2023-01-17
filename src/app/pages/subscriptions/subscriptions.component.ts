import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    private matDialog: MatDialog,
    private matSnackBar: MatSnackBar
  ) {
    this.subscriptions = [
      {
        name: 'Free',
        price: 0.0,
        code: 1,
        subscriptionPeriod: 'Monthly',
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
        subscriptionPeriod: 'Monthly',
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
        subscriptionPeriod: 'Yearly',
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

  openSnackBar(message: string, action: string) {
    this.matSnackBar.open(message, action, {
      duration: 3000,
    });
  }

  getCurrency() {
    this.authService.getCurrency().subscribe((data: any) => {
      this.exchangeRates = data;
    });
  }

  openPurchaseModal(event: any, currency: any) {
    if (event.name == 'Free') {
      this.openSnackBar('User already has this subscription level', 'X');
      return;
    }
    const dialogRef = this.matDialog.open(SubscriptionModalComponent, {
      hasBackdrop: true,
      data: {
        subscription: event,
        currency: currency,
      },
    });
  }

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
