import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddCategoryModalPage } from './add-category-modal';

@NgModule({
  declarations: [
    AddCategoryModalPage,
  ],
  imports: [
    IonicPageModule.forChild(AddCategoryModalPage),
  ],
})
export class AddCategoryModalPageModule {}
