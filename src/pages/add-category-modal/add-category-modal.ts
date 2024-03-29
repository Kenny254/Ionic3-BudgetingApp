import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import {BudgetProvider} from '../../providers/budget/budget';
@IonicPage()
@Component({
  selector: 'page-add-category-modal',
  templateUrl: 'add-category-modal.html',
})
export class AddCategoryModalPage {
  myParam: string;
    constructor(public viewCtrl: ViewController,params: NavParams,public budgetProvider: BudgetProvider) {
      //constructor
      this.myParam = params.get('myParam');
    }
    //push a new account to users node
    createCategory(categoryName:string, categoryBalance: number){
      this.budgetProvider.createCategory(categoryName);
      this.dismiss();
    }

    //close modal
    dismiss() {
      this.viewCtrl.dismiss();
    }
  }
