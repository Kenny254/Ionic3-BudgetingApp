import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InitUserPage } from './init-user';

@NgModule({
  declarations: [
    InitUserPage,
  ],
  imports: [
    IonicPageModule.forChild(InitUserPage),
  ],
})
export class InitUserPageModule {}
