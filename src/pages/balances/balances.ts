import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BudgetProvider } from './../../providers/budget/budget';
/**
 * Generated class for the BalancesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-balances',
  templateUrl: 'balances.html',
})
export class BalancesPage {
  accountList: Array<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams, public budgetProvider:BudgetProvider) {
  }

  ionViewDidEnter() {
    console.log('ionViewDidLoad users-Accounts-Page');
    //snapping public list values
    this.budgetProvider.getAccounts().on('value', snapshot => {
      this.accountList = [];
      snapshot.forEach( snap => {
        this.accountList.push({
          id: snap.key,
         Type: snap.val().Account_Type,
          Name: snap.val().Accountname,
         Balance: snap.val().Accountbalance
        });
        console.log(this.accountList);
        return false
      });
      });
  }

}
