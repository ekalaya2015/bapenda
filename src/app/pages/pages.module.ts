import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageProfileComponent } from './page-profile/page-profile.component';
import { PageProfileV2Component } from './page-profile-v2/page-profile-v2.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import {  NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';

@NgModule({
	declarations: [
		PageProfileComponent,
		PageProfileV2Component,
	],
	imports: [
		CommonModule,
		NgbModule,
		RouterModule,
		NgxEchartsModule,
		NgxGalleryModule
	],
	exports: []
})
export class PagesModule { }
