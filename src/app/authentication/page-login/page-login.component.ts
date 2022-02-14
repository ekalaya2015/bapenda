import { Component, OnInit,OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { convertTypeAcquisitionFromJson } from 'typescript';
import { AuthService } from '../../services/auth.service';
import { TokenStorageService } from '../../services/token-storage.service';
import { ToastrService } from 'ngx-toastr';
@Component({
	selector: 'app-page-login',
	templateUrl: './page-login.component.html',
	styleUrls: ['./page-login.component.css']
})
export class PageLoginComponent implements OnInit {
	form: any = {
		username: null,
		password: null
	  };
	  isLoggedIn = false;
	  isLoginFailed = false;
	  errorMessage = '';
	  roles: string[] = [];
	  username:string=''
	
	constructor(private authService: AuthService, 
		private tokenStorage: TokenStorageService,
		private router: Router,
		private toastr:ToastrService) { }

	ngOnInit() {
		if (this.tokenStorage.getToken()) {
			this.isLoggedIn = true;
			this.username = this.tokenStorage.getUser().name;
		  }	  
	}

	onSubmit():void{
		const { username, password } = this.form;

		this.authService.login(username, password).subscribe(
			
		  data => {
			this.tokenStorage.saveToken(data.access_token);
			this.tokenStorage.saveUser(data);
			this.isLoginFailed = false;
			this.isLoggedIn = true;
			this.username = this.tokenStorage.getUser().name;
			this.router.navigate(['/admin/pajak']);
		},
		  err => {
			this.errorMessage = err.error.message;
			this.isLoginFailed = true;
			this.toastr.error('Wrong username or password', undefined, {
				closeButton: true,
				positionClass: 'toast-bottom-center'
			});
	
		  },
		);	
	}	
}


