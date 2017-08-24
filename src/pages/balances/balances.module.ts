import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BalancesPage } from './balances';

@NgModule({
  declarations: [
    BalancesPage,
  ],
  imports: [
    IonicPageModule.forChild(BalancesPage),
  ],
})
export class BalancesPageModule {}
