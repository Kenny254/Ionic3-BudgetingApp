import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InitCategoriesPage } from './init-categories';

@NgModule({
  declarations: [
    InitCategoriesPage,
  ],
  imports: [
    IonicPageModule.forChild(InitCategoriesPage),
  ],
})
export class InitCategoriesPageModule {}
