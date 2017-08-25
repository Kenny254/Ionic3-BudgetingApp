import { BudgetProvider } from './../../providers/budget/budget';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public accountList: Array<any>;
  public categoryList: Array<any>;
  constructor(public navCtrl: NavController, public budgetProvider:BudgetProvider) {

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
       
          });
          console.log(this.categoryList);
          return false
        });
        });
  
  }


}
