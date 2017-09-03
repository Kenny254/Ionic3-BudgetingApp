import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth } from 'angularfire2/auth';  
import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = 'LoginPage';
  pages: Array<{title: string, component: any}>;
  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public afAuth: AngularFireAuth) {
    this.initializeApp();
    // used for side menu
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Accounts', component: 'BalancesPage' },
      { title: 'Categories', component: 'UserCategoriesPage' },
      { title: 'Expenses', component: 'UserExpensesPage' },
      { title: 'Bills', component: 'BillsPage' },
      { title: 'Settings', component: 'UserSettingsPage' },
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      //user check, keep them in home page if(user)
      const authObserver = this.afAuth.authState.subscribe( user => {
        if (user) {
          this.rootPage = HomePage;
          authObserver.unsubscribe();
        } else {
          this.rootPage = 'LoginPage';
          authObserver.unsubscribe();
        }
      });
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
