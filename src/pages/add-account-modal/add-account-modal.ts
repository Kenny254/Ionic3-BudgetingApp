import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import {BudgetProvider} from '../../providers/budget/budget';

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
      //constructor
      this.myParam = params.get('myParam');
    }
    //push a new account to users node
    createAccount(accountType:string, accountName: string, accountBalance: number, )
    {
      this.budgetProvider.createAccount(accountType,accountName, accountBalance);
      this.dismiss();
    }

    //close modal
    dismiss() {
      this.viewCtrl.dismiss();
    }
  }
