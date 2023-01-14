import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

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

  constructor() {
    this.subscriptions = [
      {
        name: 'Free',
        price: [],
        code: 1,
        attrs: [
          'Up to 100 views',
          'Up to 1 products',
          'Visual editor',
          'Domain authentication',
        ],
      },
      {
        name: 'Basic',
        price: [],
        code: 2,
        attrs: [
          'Up to 5000 views',
          'Up to 40 products',
          'Visual editor',
          'Domain authentication',
          'Traffic analysis',
          'Augmented reality',
        ],
      },
      {
        name: 'Yearly',
        price: [],
        code: 3,
        attrs: [
          'Up to 10.000 views',
          'Up to 100 products',
          'Visual editor',
          'Domain authentication',
          'Traffic analysis',
          'Augmented reality',
          'White label',
          'API access',
        ],
      },
    ];
  }

  ngOnInit(): void {}

  currencyChange(event: any) {
    console.log(event);
  }
}
