// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'movie-app-a619f',
    appId: '1:218451149766:web:ac93629c83139405bde8c7',
    databaseURL:
      'https://movie-app-a619f-default-rtdb.europe-west1.firebasedatabase.app',
    storageBucket: 'movie-app-a619f.appspot.com',
    apiKey: 'AIzaSyCaRbQ1yw7OrJDn2tFgIb0fnfIwcwf-d6s',
    authDomain: 'movie-app-a619f.firebaseapp.com',
    messagingSenderId: '218451149766',
  },
  production: false,
  apiKey: '?api_key=8ee7f4d4c46b1cba684adc6118411654',
  baseURL: 'https://api.themoviedb.org/3',
  newsKey: '22f48bc819ec40d496e45c9c10c48d16',
  newsBaseURL: 'https://newsapi.org/v2',
  currencyBaseURL: 'https://api.freecurrencyapi.com/v1',
  currencyApiKey: 'smVlrFvbZ2Oh5xvfisE3xg8IPYz6H1uQOSNvW58x',
  stripeTestKey:'pk_test_51MPxHCJwD7c1wFyCbk90c9bvk0V1rfUbOepP0xAt9GW6BM7JrmGTq2QFRDbNq9N4XDZzM5H4ahIO4GwMnH3B7aVv00BmQrG9LR',
  stripeSecretKey:'sk_test_51MPxHCJwD7c1wFyCuUe3uAxaXw9NGkho6k8ExoSgBZ5hFr1UXhmX3NCoB3vJnH0dqNtdVtQl4jI1vScOIe6VUi4i00IxGF0B9a',
  stripeBaseURL:'https://api.stripe.com/v1'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
