import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BudgetProvider } from './../../providers/budget/budget';
import { Chart } from 'chart.js';

/**
 * Generated class for the UserCategoriesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-categories',
  templateUrl: 'user-categories.html',
})
export class UserCategoriesPage {
  @ViewChild('barCanvas') barCanvas;
  @ViewChild('doughnutCanvas') doughnutCanvas;
  @ViewChild('lineCanvas') lineCanvas;
  barChart: any;
  doughnutChart: any;
  lineChart: any;
  categoryList: Array<any>;
  categoryBalance: Array<any>;
  finalNumberArray;
  finalNameArray;
  constructor(public navCtrl: NavController, public navParams: NavParams, public budgetProvider: BudgetProvider) {
  }
  

  ionViewDidEnter() {
   
   
  
  }
  //charts
  //example charts for now 
  ionViewDidLoad(){
  
  this.budgetProvider.getCategories().on('value', snapshot => {
      this.categoryList = [];
      snapshot.forEach( snap => {
        this.categoryList.push({
          id: snap.key,
       
          Name: snap.val().CategoryName,

          Balance: snap.val().CategoryBalance,

     
        });
        console.log('categorylist follows');
        console.log(this.categoryList);
        this.finalNameArray = this.categoryList.map(function (obj) {
            return obj.Name;
            
          });
          this.finalNumberArray = this.categoryList.map(function (obj) {
            return Number(obj.Balance);
          });
          console.log('array name convert check follows')
          console.log(this.finalNameArray);
          console.log('array number convert check follows')
          console.log(this.finalNumberArray);
        return false
      });
      });
      //now balances
      this.budgetProvider.getCategories().on('value', snapshot => {
        this.categoryBalance = [];
        snapshot.forEach( snap => {
          this.categoryBalance.push({
            id: snap.key,
         
            Name: snap.val().CategoryName,
  
            Balance: snap.val().CategoryBalance,
  
       
          });
          console.log('categoryBalance follows');
          console.log( this.categoryBalance);
     
          return false
        });
        });
   //this.categoryBalance.map(Number);
 this.barChart = new Chart(this.barCanvas.nativeElement, {
    
               type: 'bar',
               data: {
                   labels: this.finalNameArray,
                   datasets: [{
                       label: 'Category Spending Chart',
                       data: this.finalNumberArray,
                       backgroundColor: [
                           'rgba(255, 99, 132, 0.2)',
                           'rgba(54, 162, 235, 0.2)',
                           'rgba(255, 206, 86, 0.2)',
                           'rgba(75, 192, 192, 0.2)',
                           'rgba(153, 102, 255, 0.2)',
                           'rgba(255, 159, 64, 0.2)'
                       ],
                       borderColor: [
                           'rgba(255,99,132,1)',
                           'rgba(54, 162, 235, 1)',
                           'rgba(255, 206, 86, 1)',
                           'rgba(75, 192, 192, 1)',
                           'rgba(153, 102, 255, 1)',
                           'rgba(255, 159, 64, 1)'
                       ],
                       borderWidth: 1
                   }]
               },
               options: {
                   scales: {
                       yAxes: [{
                           ticks: {
                               beginAtZero:true
                           }
                       }]
                   }
               }
    
           });
    
           this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
    
               type: 'doughnut',
               data: {
                   labels: this.finalNameArray,
                   datasets: [{
                       label: 'Spending Chart 2',
                       data: this.finalNumberArray,
                       backgroundColor: [
                           'rgba(255, 99, 132, 0.2)',
                           'rgba(54, 162, 235, 0.2)',
                           'rgba(255, 206, 86, 0.2)',
                           'rgba(75, 192, 192, 0.2)',
                           'rgba(153, 102, 255, 0.2)',
                           'rgba(255, 159, 64, 0.2)'
                       ],
                       hoverBackgroundColor: [
                           "#FF6384",
                           "#36A2EB",
                           "#FFCE56",
                           "#FF6384",
                           "#36A2EB",
                           "#FFCE56"
                       ]
                   }]
               }
    
           });
    
           this.lineChart = new Chart(this.lineCanvas.nativeElement, {
    
               type: 'line',
               data: {
                   labels:this.finalNameArray,
                   datasets: [
                       {
                           label: "TODO-Dates from Expenses",
                           fill: false,
                           lineTension: 0.1,
                           backgroundColor: "rgba(75,192,192,0.4)",
                           borderColor: "rgba(75,192,192,1)",
                           borderCapStyle: 'butt',
                           borderDash: [],
                           borderDashOffset: 0.0,
                           borderJoinStyle: 'miter',
                           pointBorderColor: "rgba(75,192,192,1)",
                           pointBackgroundColor: "#fff",
                           pointBorderWidth: 1,
                           pointHoverRadius: 5,
                           pointHoverBackgroundColor: "rgba(75,192,192,1)",
                           pointHoverBorderColor: "rgba(220,220,220,1)",
                           pointHoverBorderWidth: 2,
                           pointRadius: 1,
                           pointHitRadius: 10,
                           data: this.finalNumberArray,
                           spanGaps: false,
                       }
                   ]
               }
    
           });
    
       }
      
    

}
