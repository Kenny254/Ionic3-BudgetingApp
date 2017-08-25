import { BudgetProvider } from './../../providers/budget/budget';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
/**
 * Generated class for the CategoriesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
})
export class CategoriesPage {
public categoryList: Array<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams,  public budgetProvider:BudgetProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoriesPage');
  }

  ionViewDidEnter() {
    this.budgetProvider.getCategories().on('value', snapshot => {
        this.categoryList = [];
        snapshot.forEach( snap => {
          this.categoryList.push({
            id: snap.key,
         
            Name: snap.val().CategoryName,
            Balance: snap.val().CategoryBalance
       
          });
          console.log(this.categoryList);
          return false
        });
        });

  }

}
