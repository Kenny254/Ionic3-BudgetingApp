import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import { usercreds } from '../../models/interfaces/usercreds';
//auth provider
import { AuthProvider } from '../../providers/auth/auth';
import {HomePage} from '../home/home';
/**
 * Generated class for the ResetPasswordPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {
  email: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public userservice: AuthProvider, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
   // console.log('ionViewDidLoad PasswordresetPage');
  }

  reset() {
    let alert = this.alertCtrl.create({
      buttons: ['Ok']
    });
    this.userservice.passwordreset(this.email).then((res: any) => {
      if (res.success) {
        alert.setTitle('Email Sent');
        alert.setSubTitle('Please follow the instructions in the email to reset your password');
      }
    }).catch((err) => {
      alert.setTitle('Failed');
      alert.setSubTitle(err);
    })
  }

  goback() {
    this.navCtrl.setRoot('LoginPage');
  }

}
