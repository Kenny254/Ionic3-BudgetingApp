import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddExpenseModalPage } from './add-expense-modal';

@NgModule({
  declarations: [
    AddExpenseModalPage,
  ],
  imports: [
    IonicPageModule.forChild(AddExpenseModalPage),
  ],
})
export class AddExpenseModalPageModule {}
