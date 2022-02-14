import { NgModule, ApplicationModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin.routing';
import { NgxEchartsModule } from 'ngx-echarts';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AdminComponent } from './admin/admin.component';
import { PagesModule } from '../pages/pages.module';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '../layout/layout.module';
import { PajakModule } from '../pajak/pajak.module';
@NgModule({
	declarations: [
		AdminComponent,
	],
	imports: [
		CommonModule,
		AdminRoutingModule,
		LayoutModule,
		RichTextEditorAllModule,
		NgbModule,
		RouterModule,
		PajakModule,
		NgxEchartsModule.forRoot({
			echarts: () => import('echarts'), 
		}),
	]
})
export class AdminModule { }
