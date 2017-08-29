
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
  accountList: Array<any>;
  myParam = '';
  constructor(public navCtrl: NavController, public params: NavParams,public modalCtrl: ModalController,
  public budgetProvider: BudgetProvider) {
    //constructor
    this.myParam = params.get('myParam');
  }

   ionViewDidEnter() {
    console.log('ionViewDidLoad users-Accounts-Page');
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
  }


  
  createAccount(accountType:string,accountName: string, accountBalance: number)
  {
    this.budgetProvider.createAccount(accountType,accountName, accountBalance);
  }

  openModalWithParams() {
    let myModal = this.modalCtrl.create('AddAccountModalPage', { 'myParam': this.myParam });
    myModal.present();
  }

  gotoinitCategories(){
    this.navCtrl.setRoot('InitCategoriesPage')
  }
}
