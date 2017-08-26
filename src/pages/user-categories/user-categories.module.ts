import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserCategoriesPage } from './user-categories';

@NgModule({
  declarations: [
    UserCategoriesPage,
  ],
  imports: [
    IonicPageModule.forChild(UserCategoriesPage),
  ],
})
export class UserCategoriesPageModule {}
