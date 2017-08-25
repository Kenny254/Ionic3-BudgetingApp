import { BudgetProvider } from './../../providers/budget/budget';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public accountList: Array<any>;
  public categoryList: Array<any>;
  public expenseList: Array<any>;
  constructor(public modalCtrl: ModalController,public navCtrl: NavController, public budgetProvider:BudgetProvider) {

  }
  ionViewDidEnter() 
  {
    console.log('ionViewDidLoad JobsPage');
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

            Balance: snap.val().CategoryBalance,

       
          });
          console.log(this.categoryList);
          return false
        });
        });
        this.budgetProvider.getExpenses().on('value', snapshot => {
          this.expenseList = [];
          snapshot.forEach( snap => {
            this.expenseList.push({
              id: snap.key,
           
              AccountName: snap.val().AccountName,
              CategoryName: snap.val().CategoryName,
              amount: snap.val().amount
         
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
