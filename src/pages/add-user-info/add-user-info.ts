import { UserProvider } from './../../providers/user/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AddUserInfoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-user-info',
  templateUrl: 'add-user-info.html',
})
export class AddUserInfoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public userProvider: UserProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddUserInfoPage');
  }

  gotoInitAccounts(){
    this.navCtrl.setRoot('InitUserPage');
  }

  addProfileInfo(pay:number,rent:number,insurance:number,phone:number){
    this.userProvider.createProfile(pay,rent,insurance,phone);
    this.gotoInitAccounts();
  }
}
