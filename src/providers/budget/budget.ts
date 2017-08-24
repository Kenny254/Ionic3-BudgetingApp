import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
import 'rxjs/add/operator/map';

/*
  Generated class for the BudgetProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class BudgetProvider {
  public UID: string;
  userProfileRef: firebase.database.Reference;
  firedata = firebase.database().ref('/users');
  constructor(public afireauth: AngularFireAuth) {
    //grab uid and link it up
    firebase.auth().onAuthStateChanged( user => {
      if (user) {
        this.UID = user.uid;
        this.userProfileRef = firebase.database().ref(`users/${user.uid}`);
      }
    });
  }//end of constructor

  createAccount(accountType:string,accountName:string, accountBalance: number): firebase.Promise<any> 
  {
    //console logging changes in firebase
    this.userProfileRef.on("value", function(snapshot) 
      {
        console.log("userProfileRef log" + snapshot.val());
      },  function (errorObject) 
        {
          console.log("The read failed: " + errorObject.code);
        });

      //the actual push to firebase
      this.userProfileRef.child('accounts').push({
        Account_Type: accountType,
        Accountname: accountName,
        Accountbalance: accountBalance
      
    })
         
    
  return 
  }

  createCategory(categoryName:string,): firebase.Promise<any> 
  {
    //console logging changes in firebase
    this.userProfileRef.on("value", function(snapshot) 
      {
        console.log("userProfileRef log" + snapshot.val());
      },  function (errorObject) 
        {
          console.log("The read failed: " + errorObject.code);
        });

      //the actual push to firebase
      this.userProfileRef.child('categories').push({
      CategoryName: categoryName
      
    })
         
    
  return 
  }




}
