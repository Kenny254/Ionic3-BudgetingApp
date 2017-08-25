import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddAccountModalPage } from './add-account-modal';

@NgModule({
  declarations: [
    AddAccountModalPage,
  ],
  imports: [
    IonicPageModule.forChild(AddAccountModalPage),
  ],
})
export class AddAccountModalPageModule {}
