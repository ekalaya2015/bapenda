import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { ThemeService } from '../../services/theme.service';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css'],
	providers: [NgbDropdownConfig]
})
export class HeaderComponent implements OnInit {

	// Properties

	@Input() showNotifMenu: boolean = false;
    @Input() showToggleMenu: boolean = false;
    @Input() darkClass:string = "";
	@Output() toggleSettingDropMenuEvent = new EventEmitter();
	@Output() toggleNotificationDropMenuEvent = new EventEmitter();

	constructor(private config: NgbDropdownConfig, private themeService: ThemeService,private tokenService:TokenStorageService,private router:Router) {
		config.placement = 'bottom-right';
	}

	ngOnInit() {
	}
	signOut(){
		this.tokenService.signOut();
		this.router.navigate(['/authentication/page-login'])
	}
	toggleSettingDropMenu() {
		this.toggleSettingDropMenuEvent.emit();
	}

	toggleNotificationDropMenu() {
		this.toggleNotificationDropMenuEvent.emit();
	}

	toggleSideMenu(){
		this.themeService.showHideMenu();
	}

}
