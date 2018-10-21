import { NgModule } from '@angular/core';
import {IonicModule, IonicPageModule} from 'ionic-angular';
import { FinancialPage } from './financial';

@NgModule({
  declarations: [
    FinancialPage,
  ],
  imports: [
    IonicPageModule.forChild(FinancialPage),
  ],
})
export class FinancialModule {}
