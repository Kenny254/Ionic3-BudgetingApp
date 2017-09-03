import { UserProvider } from './../../providers/user/user';
import { BudgetProvider } from './../../providers/budget/budget';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public accountList: Array<any>;
  public categoryList: Array<any>;
  public expenseList: Array<any>;
  public billsList: Array<any>;
  constructor(public modalCtrl: ModalController,public navCtrl: NavController, public budgetProvider:BudgetProvider, public userProvider: UserProvider) {
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
      //categories
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
        //expenses
        this.budgetProvider.getExpenses().on('value', snapshot => {
          this.expenseList = [];
          snapshot.forEach( snap => {
            this.expenseList.push({
              id: snap.key,           
              AccountName: snap.val().AccountName,
              CategoryName: snap.val().CategoryName,
              amount: snap.val().amount,
              payee: snap.val().payee,
              note: snap.val().note         
            });
            console.log(this.expenseList);
            return false
          });
          });
          //bills
          this.budgetProvider.getBills().on('value', snapshot => {
            this.billsList = [];
            snapshot.forEach( snap => {
              this.billsList.push({
                id: snap.key,
                Name: snap.val().billName,
                Amount: snap.val().billAmount,
                DueDate: snap.val().billDate
              });
              console.log("Bills"+this.billsList,"Accounts"+ this.accountList,"Categories"+ this.categoryList);
              return false
            });
            });
  }

  openExpenseModal() {
    let myModal = this.modalCtrl.create('AddExpenseModalPage');
    myModal.present();
  }

  logOut(){
    this.userProvider.logoutUser().then( () => this.navCtrl.setRoot('LoginPage'));
  }
}
