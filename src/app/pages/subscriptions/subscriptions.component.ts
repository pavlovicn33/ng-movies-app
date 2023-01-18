import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { getAuth } from 'firebase/auth';
import { SubscriptionModalComponent } from 'src/app/components/subscription-modal/subscription-modal.component';
import { environment } from 'src/environments/environment';
import { DialogComponent } from 'src/shared/components/dialog/dialog.component';
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
  isSubscribed: boolean = false;
  subscriptionId: string = '';
  subscriptionName: string = '';
  constructor(
    private authService: AuthService,
    private matDialog: MatDialog,
    private db: AngularFirestore,
    private matSnackBar: MatSnackBar,
    public dialog: MatDialog,
    private subscriptionService: SubscriptionsService,
    private router: Router
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
    this.getIsSubscribed();
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

  getIsSubscribed() {
    const auth = getAuth();
    const userId = auth.currentUser?.uid;
    this.db
      .collection('users')
      .doc(userId)
      .ref.onSnapshot(
        {
          includeMetadataChanges: true,
        },
        (doc: any) => {
          this.db
            .collection('users')
            .doc(userId)
            .get()
            .subscribe((data: any) => {
              this.subscriptionName = data.data().subscription;
              if (
                data.data().subscription == 'Basic' ||
                data.data().subscription == 'Yearly'
              ) {
                this.subscriptionId = data.data().subscriptionId;
                this.isSubscribed = true;
              }
            });
        }
      );
  }

  openPurchaseModal(event: any, currency: any) {
    if (this.subscriptionName == 'Free' && event.name == 'Free') {
      this.openSnackBar('User already has this subscription level', 'X');
      return;
    }
    if (this.subscriptionName == 'Basic' && event.name == 'Basic') {
      this.openSnackBar('User already has this level of subscription', 'X');
      return;
    }
    if (this.subscriptionName == 'Yearly' && event.name == 'Yearly') {
      this.openSnackBar('User already has this level of subscription', 'X');
      return;
    }
    if (
      (this.subscriptionName == 'Yearly' && event.name == 'Basic') ||
      event.name == 'Free'
    ) {
      this.openSnackBar('User already has a higher level of subscription', 'X');
      return;
    }
    if (this.subscriptionName == 'Basic' && event.name == 'Free') {
      this.openSnackBar('User already has a higher level of subscription', 'X');
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

  disableSubscription() {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        option: 'subscription',
        title: 'Cancellation',
        description: 'this action will cancel your ',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == true) {
        const pack = {
          subscriptionId: this.subscriptionId,
        };
        this.subscriptionService
          .cancelSubscription(pack)
          .subscribe((data: any) => {
            this.router.navigate(['/ngmovies/movies']);
            this.openSnackBar('Your subscription is cancelled', 'X');
            this.authService.updateSubscription('Free');
          });
      }
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
