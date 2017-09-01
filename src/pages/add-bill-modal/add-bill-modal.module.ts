import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddBillModalPage } from './add-bill-modal';

@NgModule({
  declarations: [
    AddBillModalPage,
  ],
  imports: [
    IonicPageModule.forChild(AddBillModalPage),
  ],
})
export class AddBillModalPageModule {}
