
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import {BudgetProvider} from '../../providers/budget/budget';
import {AddAccountModalPage } from '../add-account-modal/add-account-modal';

@IonicPage()
@Component({
  selector: 'page-init-user',
  templateUrl: 'init-user.html',
})
export class InitUserPage {
  myParam = '';
  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController,
  public budgetProvider: BudgetProvider) {
    //constructor
  }
  createAccount(accountName: string, accountBalance: number)
  {
    this.budgetProvider.createAccount(accountName, accountBalance);
  }
  openModalWithParams() {
    let myModal = this.modalCtrl.create('AddAccountModalPage', { 'myParam': this.myParam });
    myModal.present();
  }
  gotoinitCategories(){
    this.navCtrl.setRoot('InitCategoriesPage')
  }
}
