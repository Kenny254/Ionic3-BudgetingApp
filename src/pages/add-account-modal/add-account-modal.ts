import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import {BudgetProvider} from '../../providers/budget/budget';
/**
 * Generated class for the AddAccountModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-account-modal',
  templateUrl: 'add-account-modal.html',
})
export class AddAccountModalPage {
  myParam: string;
  
    constructor(
      public viewCtrl: ViewController,
      params: NavParams,
      public budgetProvider: BudgetProvider
    ) {
      this.myParam = params.get('myParam');
    }
    createAccount(accountName: string, accountBalance: number)
    {
      this.budgetProvider.createAccount(accountName, accountBalance);
      this.dismiss();
    }


    dismiss() {
      this.viewCtrl.dismiss();
    }
  }
