// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'ohm-angular-app',
    appId: '1:152392297566:web:65376b548bb80b3f6898cf',
    databaseURL: 'https://ohm-angular-app-default-rtdb.europe-west1.firebasedatabase.app',
    storageBucket: 'ohm-angular-app.appspot.com',
    locationId: 'europe-west',
    apiKey: 'AIzaSyBSlsjt1GFio_ZA0PdWX0t3hBOF9LrWMc8',
    authDomain: 'ohm-angular-app.firebaseapp.com',
    messagingSenderId: '152392297566',
  },
  production: false
};

// copy that I made. - the upper firebase configuration was generated on install of @angular/fire
// firebaseConfig: {
//   apiKey: 'AIzaSyBSlsjt1GFio_ZA0PdWX0t3hBOF9LrWMc8',
//   authDomain: 'ohm-angular-app.firebaseapp.com',
//   databaseURL:
//     'https://ohm-angular-app-default-rtdb.europe-west1.firebasedatabase.app',
//   projectId: 'ohm-angular-app',
//   storageBucket: 'ohm-angular-app.appspot.com',
//   messagingSenderId: '152392297566',
//   appId: '1:152392297566:web:65376b548bb80b3f6898cf',
// },

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
