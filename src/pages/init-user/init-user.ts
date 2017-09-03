
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import {BudgetProvider} from '../../providers/budget/budget';
import {AddAccountModalPage } from '../add-account-modal/add-account-modal';
import {HomePage} from '../home/home';
@IonicPage()
@Component({
  selector: 'page-init-user',
  templateUrl: 'init-user.html',
})
export class InitUserPage {
  myParam = '';
  accountList: Array<any>;
  billsList: Array<any>;
  categoryList: Array<any>;
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
  openModalWithParams() {
    let myModal = this.modalCtrl.create('AddAccountModalPage', { 'myParam': this.myParam });
    myModal.present();
  }
  
  openCategoryModalWithParams() {
    let myModal = this.modalCtrl.create('AddCategoryModalPage');
    myModal.present();
  }

  gotoHome(){
    this.navCtrl.setRoot(HomePage)
  }
}
