import { NgModule } from '@angular/core';
import {IonicModule, IonicPageModule} from 'ionic-angular';
import { BillsPage } from './bills';


@NgModule({
  imports: [IonicModule],
  declarations: [
    BillsPage
  ],
  entryComponents: [
    BillsPage
  ]
})
export class BillsModule {}
