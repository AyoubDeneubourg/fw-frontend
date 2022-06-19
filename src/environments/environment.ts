// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'fw-plugger',
    appId: '1:595965195709:web:3b1765396a9b3c018c4ed4',
    databaseURL: 'https://fw-plugger-default-rtdb.europe-west1.firebasedatabase.app',
    storageBucket: 'fw-plugger.appspot.com',
    locationId: 'europe-west',
    apiKey: 'AIzaSyD3rQBzTPOSNOboi1N1I4ZkjrzPQyxPBOM',
    authDomain: 'fw-plugger.firebaseapp.com',
    messagingSenderId: '595965195709',
  },
  baseUrl: 'https://plugger.be',
  production: false,
  stripe: 'pk_test_51L2waTAKK7UhTIYhiTAU8hs2rCGuFSA20cGTcIg1AqHjqkgXDZq76yBpOtys1UoiEOdDHluQ55rNOmtK6Kr3BRsh004nXvqHqD',

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
