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
  ionViewDidLoad(){
   console.log("Provider check")
  }
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

  createCategory(categoryName:string, ): firebase.Promise<any> 
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
      CategoryName: categoryName,
      CategoryBalance: 0
      
    })
         
    
  return 
  }

  createBill(billName:string, billAmount: number): firebase.Promise<any> 
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
      this.userProfileRef.child('bills').push({
        billName: billName,
        billAmount: billAmount
      
    })
         
    
  return 
  }

  addExpense(accountName:string, accountID, categoryName:string, categoryID:string, amount:any, payee:string, note: string,){
     //console logging changes in firebase
     this.userProfileRef.on("value", function(snapshot) 
     {
       console.log("userProfileRef log" + snapshot.val());
     },  function (errorObject) 
       {
         console.log("The read failed: " + errorObject.code);
       });
       let date = new Date();
     //the actual push to firebase
     this.userProfileRef.child('expenses').push({
       AccountName: accountName,
     CategoryName: categoryName,
     amount: amount,
     payee: payee,
     note: note,
     date: date
   })
   //push expense to individual account
   this.userProfileRef.child('accounts').child(accountID).child('/expenses').push({
    AccountName: accountName,
    CategoryName: categoryName,
    amount: amount,
    payee: payee,
    note: note,
    date: date
   });
   //subtract expense from total balance
   this.userProfileRef.child('accounts').child(accountID).child(`/Accountbalance`).transaction(function(currentbalance) {
    return currentbalance -= amount;
  });
  //push expensne to individual account
  this.userProfileRef.child('categories').child(categoryID).child('/expenses').push({
    AccountName: accountName,
    CategoryName: categoryName,
    amount: amount,
    payee: payee,
    note: note,
    date: date
   });
  //add to "amount" or the amountSpend in that category for the month
  this.userProfileRef.child('categories').child(categoryID).child(`/CategoryBalance`).transaction( cat => {
  

   //cat =  parseInt(cat);
   console.log("CATEGORY BALANCE CHECK1 "+ cat, " ",amount," ", "calculations", cat-amount, cat+amount)
    
   cat = Number(cat);
   cat = Number.parseInt(cat) + Number.parseInt(amount.toString());
   console.log("CATEGORY BALANCE CHECK2 "+ cat, " ",amount," ", "calculations", cat-amount, cat+amount)
  
    return cat;
  });
  
  }//end of add expense


  //=======RETURNS FROM FIREBASE=======\\

  getAccounts(): firebase.database.Reference {
    return this.userProfileRef.child("/accounts");
  }

  getCategories(): firebase.database.Reference {
    return this.userProfileRef.child("/categories");
  }

  getBills(): firebase.database.Reference {
    return this.userProfileRef.child("/bills");
  }

  getExpenses(): firebase.database.Reference {
    return this.userProfileRef.child("/expenses");
  }




}
