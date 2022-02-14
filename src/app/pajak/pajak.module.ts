import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalitikComponent } from './analitik/analitik.component';
import { TabelComponent } from './tabel/tabel.component';
import { WpRegisterComponent } from './wp-register/wp-register.component';
import { WpListComponent } from './wp-list/wp-list.component';
import { RouterModule } from '@angular/router';
import { EarningCardComponent } from './earning-card/earning-card.component';
import { TaxesCardComponent } from './taxes-card/taxes-card.component';
import {  NgxEchartsModule } from 'ngx-echarts';
import {FormsModule} from "@angular/forms";
import { NgxSpinnerModule } from "ngx-bootstrap-spinner";

@NgModule({
  declarations: [
    AnalitikComponent,
    TabelComponent,
    WpRegisterComponent,
    WpListComponent,
    EarningCardComponent,
    TaxesCardComponent,
  ],
  imports: [
    NgxSpinnerModule,
    FormsModule,
    CommonModule,
    RouterModule,
    NgxEchartsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class PajakModule { }
