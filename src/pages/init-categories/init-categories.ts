
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import {BudgetProvider} from '../../providers/budget/budget';
import {AddAccountModalPage } from '../add-account-modal/add-account-modal';
import {HomePage} from '../home/home';
@IonicPage()
@Component({
  selector: 'page-init-categories',
  templateUrl: 'init-categories.html',
})
export class InitCategoriesPage {
  myParam = '';
  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController,
  public budgetProvider: BudgetProvider) {
    //constructor
  }
  
  createCategory(categoryName: string, categoryBalance: number)
  {
    this.budgetProvider.createCategory(categoryName, categoryBalance);
  }

  openModalWithParams() {
    let myModal = this.modalCtrl.create('AddCategoryModalPage');
    myModal.present();
  }

  gotoinitCategories(){
    this.navCtrl.setRoot(HomePage)
  }
}