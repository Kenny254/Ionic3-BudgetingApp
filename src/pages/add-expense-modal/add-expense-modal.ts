import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { BudgetProvider } from './../../providers/budget/budget';
@IonicPage()
@Component({
  selector: 'page-add-expense-modal',
  templateUrl: 'add-expense-modal.html',
})
export class AddExpenseModalPage {
  public accountList: Array<any>;
  public categoryList: Array<any>;
  constructor( public viewCtrl: ViewController,public budgetProvider:BudgetProvider,public navCtrl: NavController, public navParams: NavParams) {
  }
  ionViewDidEnter() 
  {
    console.log('ionViewDidLoad Add Expense Modal Page');
    //snapping public list values
    //accounts
    this.budgetProvider.getAccounts().on('value', snapshot => {
      this.accountList = [];
      snapshot.forEach( snap => {
        this.accountList.push({
          id: snap.key,
          Type: snap.val().Account_Type,
          Name: snap.val().Accountname,
          Balance: snap.val().Accountbalance
        });
        console.log(this.accountList); return false
      });
      });
      //categories
      this.budgetProvider.getCategories().on('value', snapshot => {
        this.categoryList = [];
        snapshot.forEach( snap => {
          this.categoryList.push({
            id: snap.key,
            Name: snap.val().CategoryName,       
          });
          console.log(this.categoryList); return false
        });
        });
  }

  addExpense(Account:string, AccountID:string, Category:string, CategoryID:string, expenseAmount:number, expensePayee: string, expenseNote: string){
    let date = new Date();
    console.log(date);
    this.budgetProvider.addExpense(Account,AccountID,Category,CategoryID,expenseAmount, expensePayee, expenseNote, date);
    this.dismiss();
  }
  //close modal
  dismiss() {
    this.viewCtrl.dismiss();
  }
}
