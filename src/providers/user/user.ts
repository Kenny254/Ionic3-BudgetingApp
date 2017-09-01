import { NavController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
import 'rxjs/add/operator/map';

@Injectable()
export class UserProvider {
  userProfileRef: firebase.database.Reference;
  firedata = firebase.database().ref('/users');
  UID;
  constructor(public afireauth: AngularFireAuth, ) {
     //grab uid and link it up
     firebase.auth().onAuthStateChanged( user => {
      if (user) {
        this.UID = user.uid;
        this.userProfileRef = firebase.database().ref(`users/${user.uid}`);
      }
    });
  }
  //create user with email/pass/nickname
  adduser(newuser) {
    var promise = new Promise((resolve, reject) => {
      this.afireauth.auth.createUserWithEmailAndPassword(newuser.email, newuser.password).then(() => {
        this.afireauth.auth.currentUser.updateProfile({
          displayName: newuser.displayName,
          photoURL: ''
        }).then(() => {
          this.firedata.child(this.afireauth.auth.currentUser.uid).set({
            uid: this.afireauth.auth.currentUser.uid,
            displayName: newuser.displayName,
            photoURL: 'N/A'
          }).then(() => {
            console.log('succesfully stored user variables')
            resolve({ success: true });
            }).catch((err) => {
              reject(err);
          })
          }).catch((err) => {
            reject(err);
        })
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }

  createProfile(pay:number,): firebase.Promise<any> 
  {
    //error catches
    if (typeof pay !== 'undefined') {
      // the variable is defined
    }
   
    //console logging changes in firebase
    this.userProfileRef.on("value", function(snapshot) 
      {
        console.log("userProfileRef log" + snapshot.val());
      },  function (errorObject) 
        {
          console.log("The read failed: " + errorObject.code);
        });

      //the actual push to firebase
      this.userProfileRef.child('userinfo').update({
       Pay: pay,
      
      
    })
         
    
  return 
  }

  logoutUser(): firebase.Promise<any> {
    return this.afireauth.auth.signOut()
    
  }




}
