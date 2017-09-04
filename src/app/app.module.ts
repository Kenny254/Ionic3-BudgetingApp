
//ionic native/entry components
import { LocalNotifications } from '@ionic-native/local-notifications';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import 'rxjs/add/observable/fromPromise'
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';
//charting
import {ChartsModule} from 'ng2-charts/charts/charts';
import '../../node_modules/chart.js/dist/Chart.bundle.min.js';
//Firebase/Af2
import { config } from './app.firebaseconfig';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
//Our Providers
import { BudgetProvider } from '../providers/budget/budget';
import { AuthProvider } from '../providers/auth/auth';
import { UserProvider } from '../providers/user/user';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
   
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    //af2
    AngularFireModule.initializeApp(config),
    //charts.js
    ChartsModule,
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    
  ],
  providers: [
    //ionic
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LocalNotifications,
    Keyboard,
    //af2
    AngularFireAuth,
    //ourproviders
    BudgetProvider,
    AuthProvider,
    UserProvider,
  ]
})
export class AppModule {}
