import { AgmCoreModule } from '@agm/core';
import { HttpClientModule} from '@angular/common/http';
import { Http, HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PayPal } from '@ionic-native/paypal';
import { IonicApp, IonicModule } from 'ionic-angular';
import { Config } from '../config';

import { LoginPage } from '../pages/login/login';
import { AddTechnologyPage } from '../pages/add-technology/add-technology';
import { ComponentsModule } from '../pages/components/components.module';
import { GoogleMapsModule } from '../pages/google-maps/google-maps.module';
import { HomeModule } from '../pages/home/home.module';
import { BillsModule } from '../pages/bills/bills.module';
import { SlideBoxModule } from '../pages/slide-box/slide-box.module';
import { FinancialModule } from '../pages/financial/financial.module';
import { MyApp } from './app.component';
import { PayPalModule } from '../pages/paypal/paypal.module';

import { AngularFireModule } from 'angularFire2';
import { AngularFireAuth } from 'angularFire2/auth';
import { firebaseConfig } from '../config';
import { AuthService } from '../services/auth.service';
import { SignupPage } from '../pages/signup/signup';
import { NgxErrorsModule } from '@ultimate/ngxerrors';


@NgModule({
	declarations: [
		MyApp,
		LoginPage,
		SignupPage
	],
	imports: [
		BrowserModule,
		HttpClientModule,
    HttpModule,
		IonicModule.forRoot(MyApp),
		AgmCoreModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig.fire),
		ComponentsModule,
		GoogleMapsModule,
    FinancialModule,
		HomeModule,
		SlideBoxModule,
		PayPalModule,
		NgxErrorsModule,
    BillsModule
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
		LoginPage,
		SignupPage
	],
	providers: [
		Config,
		StatusBar,
		AngularFireAuth,
		AuthService,
    SplashScreen

	]
})
export class AppModule {
}
