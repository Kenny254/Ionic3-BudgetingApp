import { UserProvider } from './../../providers/user/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController,ModalController } from 'ionic-angular';
import {BudgetProvider} from '../../providers/budget/budget';
import {AddAccountModalPage } from '../add-account-modal/add-account-modal';
import {HomePage} from '../home/home';
//for notifs
import { LocalNotifications } from '@ionic-native/local-notifications';
import * as moment from 'moment';

/**
 * Generated class for the AddUserInfoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-user-info',
  templateUrl: 'add-user-info.html',
})
export class AddUserInfoPage {
  notifyTime: any;
  notifications: any[] = [];
  days: any[];
  chosenHours: number;
  chosenMinutes: number;
  accountList: Array<any>;
  myParam = '';
  categoryList: Array<any>;
  billsList: Array<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController,
    public budgetProvider: BudgetProvider, public userProvider: UserProvider, 
    public platform: Platform, public alertCtrl: AlertController, public localNotifications: LocalNotifications) {
    this.notifyTime = moment(new Date()).format();
            //grabbing date from device
           this.chosenHours = new Date().getHours();
           this.chosenMinutes = new Date().getMinutes();
            //checking week dates
           this.days = [
               {title: 'Monday', dayCode: 1, checked: false},
               {title: 'Tuesday', dayCode: 2, checked: false},
               {title: 'Wednesday', dayCode: 3, checked: false},
               {title: 'Thursday', dayCode: 4, checked: false},
               {title: 'Friday', dayCode: 5, checked: false},
               {title: 'Saturday', dayCode: 6, checked: false},
               {title: 'Sunday', dayCode: 0, checked: false}
           ];
  }

  ionViewDidLoad() {
      console.log("entering page")
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
           
            return false
          });
          });

          this.budgetProvider.getBills().on('value', snapshot => {
            this.billsList = [];
            snapshot.forEach( snap => {
              this.billsList.push({
                id: snap.key,
              Name: snap.val().billName,
                Amount: snap.val().billAmount,
              
              });
              console.log("Bills"+this.billsList,"Accounts"+ this.accountList,"Categories"+ this.categoryList);
              return false
            });
            });
  }

  gotoInitAccounts(){
    this.navCtrl.setRoot('InitUserPage');
  }

  addProfileInfo(pay:number){
    this.userProvider.createProfile(pay);
    
  }

  createAccount(accountType:string,accountName: string, accountBalance: number)
  {
    this.budgetProvider.createAccount(accountType,accountName, accountBalance);
  }

  openModalWithParams() {
    let myModal = this.modalCtrl.create('AddAccountModalPage', { 'myParam': this.myParam });
    myModal.present();
  }
  openCategoryModalWithParams() {
    let myModal = this.modalCtrl.create('AddCategoryModalPage');
    myModal.present();
  }
  openBillModalWithParams() {
    let myModal = this.modalCtrl.create('AddBillModalPage');
    myModal.present();
  }

  
  gotoHome(){
    this.navCtrl.setRoot(HomePage)
  }
  /*NOTIF AND TIME LOGGING */
  timeChange(time){
    this.chosenHours = time.hour.value;
    this.chosenMinutes = time.minute.value;
  }

 addpayNotifications(payperiod:string){
  let currentDate = new Date();
  let currentDay = currentDate.getDay(); // Sunday = 0, Monday = 1, etc.
  for(let day of this.days){
      if(day.checked){
          let firstNotificationTime = new Date();
          let dayDifference = day.dayCode - currentDay;
          if(dayDifference < 0){
              dayDifference = dayDifference + 7; // for cases where the day is in the following week
          }  
          firstNotificationTime.setHours(firstNotificationTime.getHours() + (24 * (dayDifference)));
          firstNotificationTime.setHours(this.chosenHours);
          firstNotificationTime.setMinutes(this.chosenMinutes);
          let notification = {
             id: 1,
          title: "Pay Test",
          message: "Payday",
          firstAt: firstNotificationTime, // firstAt and at properties must be an IETF-compliant RFC 2822 timestamp
          every: payperiod, // in html this is set to every 'week'/'20160 minutes(two weeks)'/'month', but currently will trigger from the day of the week , needs to be fixed
          icon: "http://icons.com/?cal_id=1",
          };
          this.notifications.push(notification);
      }
  }
  console.log("Notifications to be scheduled: ", this.notifications);
  if(this.platform.is('cordova')){
      // Cancel any existing notifications
      this.localNotifications.cancelAll().then(() => {
          // Schedule the new notifications
          this.localNotifications.schedule(this.notifications);
          this.notifications = [];
          let alert = this.alertCtrl.create({
              title: 'Notifications set',
              buttons: ['Ok']
          });
          alert.present();
      });
  }
}

addrentNotifications(){
  let currentDate = new Date();
  let currentDay = currentDate.getDay(); // Sunday = 0, Monday = 1, etc.
  for(let day of this.days){
      if(day.checked){
          let firstNotificationTime = new Date();
          let dayDifference = day.dayCode - currentDay;
          if(dayDifference < 0){
              dayDifference = dayDifference + 7; // for cases where the day is in the following week
          }  
          firstNotificationTime.setHours(firstNotificationTime.getHours() + (24 * (dayDifference)));
          firstNotificationTime.setHours(this.chosenHours);
          firstNotificationTime.setMinutes(this.chosenMinutes);
          let notification = {
             id: 2,
          title: "Rent Test",
          message: "Rent",
          firstAt: firstNotificationTime, // firstAt and at properties must be an IETF-compliant RFC 2822 timestamp
          every: "month", 
          icon: "http://icons.com/?cal_id=1",
          };
          this.notifications.push(notification);
      }
  }
  console.log("Notifications to be scheduled: ", this.notifications);
  if(this.platform.is('cordova')){
      // Cancel any existing notifications
      this.localNotifications.cancelAll().then(() => {
          // Schedule the new notifications
          this.localNotifications.schedule(this.notifications);
          this.notifications = [];
          let alert = this.alertCtrl.create({
              title: 'Notifications set',
              buttons: ['Ok']
          });
          alert.present();
      });
  }
}

addinsuranceNotifications(){
  let currentDate = new Date();
  let currentDay = currentDate.getDay(); // Sunday = 0, Monday = 1, etc.
  for(let day of this.days){
      if(day.checked){
          let firstNotificationTime = new Date();
          let dayDifference = day.dayCode - currentDay;
          if(dayDifference < 0){
              dayDifference = dayDifference + 7; // for cases where the day is in the following week
          }  
          firstNotificationTime.setHours(firstNotificationTime.getHours() + (24 * (dayDifference)));
          firstNotificationTime.setHours(this.chosenHours);
          firstNotificationTime.setMinutes(this.chosenMinutes);
          let notification = {
             id: 3,
          title: "Insurance Test",
          message: "Insurace",
          firstAt: firstNotificationTime, // firstAt and at properties must be an IETF-compliant RFC 2822 timestamp
          every: "month",
          icon: "http://icons.com/?cal_id=1",
          };
          this.notifications.push(notification);
      }
  }
  console.log("Notifications to be scheduled: ", this.notifications);
  if(this.platform.is('cordova')){
      // Cancel any existing notifications
      this.localNotifications.cancelAll().then(() => {
          // Schedule the new notifications
          this.localNotifications.schedule(this.notifications);
          this.notifications = [];
          let alert = this.alertCtrl.create({
              title: 'Notifications set',
              buttons: ['Ok']
          });
          alert.present();
      });
  }
}

addphoneNotifications(){
  let currentDate = new Date();
  let currentDay = currentDate.getDay(); // Sunday = 0, Monday = 1, etc.
  for(let day of this.days){
      if(day.checked){
          let firstNotificationTime = new Date();
          let dayDifference = day.dayCode - currentDay;
          if(dayDifference < 0){
              dayDifference = dayDifference + 7; // for cases where the day is in the following week
          }  
          firstNotificationTime.setHours(firstNotificationTime.getHours() + (24 * (dayDifference)));
          firstNotificationTime.setHours(this.chosenHours);
          firstNotificationTime.setMinutes(this.chosenMinutes);
          let notification = {
             id: 4,
          title: "Phone Test",
          message: "Phone",
          firstAt: firstNotificationTime, // firstAt and at properties must be an IETF-compliant RFC 2822 timestamp
          every: "month", 
          icon: "http://icons.com/?cal_id=1",
          };
          this.notifications.push(notification);
      }
  }
  console.log("Notifications to be scheduled: ", this.notifications);
  if(this.platform.is('cordova')){
      // Cancel any existing notifications
      this.localNotifications.cancelAll().then(() => {
          // Schedule the new notifications
          this.localNotifications.schedule(this.notifications);
          this.notifications = [];
          let alert = this.alertCtrl.create({
              title: 'Notifications set',
              buttons: ['Ok']
          });
          alert.present();
      });
  }
}


}
