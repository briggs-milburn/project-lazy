import { Injectable } from '@angular/core';

@Injectable()
export class Config {
  // Paypal
  static payPalEnvironmentSandbox = 'AXg409-ZD7lFcgk2JdHkLkggX8u7LnT7cfkGL2AG0y7bx5OAvOmErpKKz5D68kzXRxbfe_KRlFf681rk';
  static payPalEnvironmentProduction = '';
}
export const firebaseConfig = {
    fire: {
              apiKey: "AIzaSyDUxNb7TYyGWLX7sSybmBlSef5ENSkWTiE",
               authDomain: "rentalapp-aa53a.firebaseapp.com",
               databaseURL: "https://rentalapp-aa53a.firebaseio.com",
               projectId: "rentalapp-aa53a",
               storageBucket: "rentalapp-aa53a.appspot.com",
               messagingSenderId: "609171887649"
    }
};
