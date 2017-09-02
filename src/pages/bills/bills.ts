import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { BudgetProvider } from './../../providers/budget/budget';
/**
 * Generated class for the BillsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bills',
  templateUrl: 'bills.html',
})
export class BillsPage {
  billsList: Array<any>;
  constructor(public modalCtrl: ModalController,public navCtrl: NavController, public navParams: NavParams, public budgetProvider: BudgetProvider) {
  }

  ionViewDidLoad() {
    this.budgetProvider.getBills().on('value', snapshot => {
      this.billsList = [];
      snapshot.forEach( snap => {
        this.billsList.push({
          id: snap.key,
        Name: snap.val().billName,
          Amount: snap.val().billAmount,
        
        });
        console.log("Bills"+this.billsList,);
        return false
      });
      });
  }

  openModalWithParams() {
    let myModal = this.modalCtrl.create('AddBillModalPage');
    myModal.present();
  }

}
