import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { BudgetProvider } from './../../providers/budget/budget';
/**
 * Generated class for the AddExpenseModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

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
      this.budgetProvider.getCategories().on('value', snapshot => {
        this.categoryList = [];
        snapshot.forEach( snap => {
          this.categoryList.push({
            id: snap.key,
         
            Name: snap.val().CategoryName,
       
          });
          console.log(this.categoryList);
          return false
        });
        });
  
  }
  addExpense(Account:string, AccountID:string, Category:string, CategoryID:string, expenseAmount:number, expensePayee: string, expenseNote: string){
    this.budgetProvider.addExpense(Account,AccountID,Category,CategoryID,expenseAmount, expensePayee, expenseNote);
    if(Error){console.log(Error)}
    this.dismiss();
  }
  //close modal
  dismiss() {
    this.viewCtrl.dismiss();
  }
}
