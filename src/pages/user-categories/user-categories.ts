import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BudgetProvider } from './../../providers/budget/budget';
/**
 * Generated class for the UserCategoriesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-categories',
  templateUrl: 'user-categories.html',
})
export class UserCategoriesPage {
  categoryList: Array<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams, public budgetProvider: BudgetProvider) {
  }

  ionViewDidEnter() {
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
  }

}
