
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import {BudgetProvider} from '../../providers/budget/budget';
import {AddAccountModalPage } from '../add-account-modal/add-account-modal';
import {HomePage} from '../home/home';
import { UserProvider } from '../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-init-categories',
  templateUrl: 'init-categories.html',
})
export class InitCategoriesPage {
  public categoryList: Array<any>;
  myParam = '';
  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController,
  public budgetProvider: BudgetProvider) {
    //constructor
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
  
  createCategory(categoryName: string, categoryBalance: number)
  {
    this.budgetProvider.createCategory(categoryName, categoryBalance);
  }

  openCategoryModalWithParams() {
    let myModal = this.modalCtrl.create('AddCategoryModalPage');
    myModal.present();
  }

  gotoinitCategories(){
    this.navCtrl.setRoot(HomePage)
  }
}