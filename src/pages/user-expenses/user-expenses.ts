import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { BudgetProvider } from './../../providers/budget/budget';

@IonicPage()
@Component({
  selector: 'page-user-expenses',
  templateUrl: 'user-expenses.html',
})
export class UserExpensesPage {
  expenseList: Array<any>;
  constructor(public modalCtrl:ModalController,public budgetProvider: BudgetProvider,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidEnter() {
    console.log('ionViewDidLoad UserExpensesPage');
    this.budgetProvider.getExpenses().on('value', snapshot => {
      this.expenseList = [];
      snapshot.forEach( snap => {
        this.expenseList.push({
          id: snap.key,           
          AccountName: snap.val().AccountName,
          CategoryName: snap.val().CategoryName,
          amount: snap.val().amount,
          payee: snap.val().payee,
          note: snap.val().note,
          date: snap.val().date   
        });
        console.log(this.expenseList);
        return false
      });
      });
  }
  
  openExpenseModal() {
    let myModal = this.modalCtrl.create('AddExpenseModalPage');
    myModal.present();
  }  

}
