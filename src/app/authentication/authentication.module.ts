import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageLoginComponent } from './page-login/page-login.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { routing } from './authentication.routing';
import { PagesModule } from '../pages/pages.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
	declarations: [PageLoginComponent, AuthenticationComponent],
	imports: [
		CommonModule,
		routing,
		PagesModule,
        RouterModule,
        FormsModule
	]
})
export class AuthenticationModule { }
