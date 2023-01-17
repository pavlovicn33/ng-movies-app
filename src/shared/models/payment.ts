export class Payment {
  StripeCustomerId: string;
  StripeTransactionId: string;
  SubscriptionDateTime: Date;
  StripeToken: string;
  SubscriptionType: number;
  Email: string;
  Phone: string;
  SubscriptionPeriod: string;
  CardHolder: string;
  StripeKey: string;
  Currency: string;

  constructor(obj?: any) {
    this.StripeCustomerId = (obj && obj.StripeCustomerId) || '';
    this.StripeTransactionId = (obj && obj.StripeTransactionId) || '';
    this.SubscriptionDateTime = (obj && obj.SubscriptionDateTime) || new Date();
    this.SubscriptionType = (obj && obj.SubscriptionType) || 0;
    this.Email = (obj && obj.Email) || '';
    this.Phone = (obj && obj.Phone) || '';
    this.StripeToken = (obj && obj.StripeToken) || '';
    this.SubscriptionPeriod = (obj && obj.SubscriptionPeriod) || '';
    this.CardHolder = (obj && obj.CardHolder) || '';
    this.StripeKey = (obj && obj.StripeKey) || '';
    this.Currency = (obj && obj.Currency) || '';
  }
}
