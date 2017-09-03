import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import {BudgetProvider} from '../../providers/budget/budget';
@IonicPage()
@Component({
  selector: 'page-add-bill-modal',
  templateUrl: 'add-bill-modal.html',
})
export class AddBillModalPage {
  myParam: string;
  constructor(public viewCtrl: ViewController,params: NavParams,public budgetProvider: BudgetProvider) {
    //constructor
    this.myParam = params.get('myParam');
  }

  //push a new bill to user node
  createBill(billname:string, billamount:number, billDate:any ){
    this.budgetProvider.createBill(billname,billamount,billDate);
    this.dismiss();
  }

  //close modal
  dismiss() {
    this.viewCtrl.dismiss();
  }
}
