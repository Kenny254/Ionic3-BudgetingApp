import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserExpensesPage } from './user-expenses';

@NgModule({
  declarations: [
    UserExpensesPage,
  ],
  imports: [
    IonicPageModule.forChild(UserExpensesPage),
  ],
})
export class UserExpensesPageModule {}
