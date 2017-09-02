import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//creds
import { usercreds } from '../../models/interfaces/usercreds';
//auth provider
import { AuthProvider } from '../../providers/auth/auth';
import {HomePage} from '../home/home';
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  credentials = {} as usercreds;
  constructor(public navCtrl: NavController, public navParams: NavParams, public authservice: AuthProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  signin() {
    this.authservice.login(this.credentials).then((res: any) => {
      if (!res.code)
        this.navCtrl.setRoot(HomePage);
      else
        alert(res);
    })
  }

  passwordreset() {
     this.navCtrl.push('ResetPasswordPage');
  }
   
  signup() {
    this.navCtrl.push('SignUpPage');
  }

}
