import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddUserInfoPage } from './add-user-info';

@NgModule({
  declarations: [
    AddUserInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(AddUserInfoPage),
  ],
})
export class AddUserInfoPageModule {}
