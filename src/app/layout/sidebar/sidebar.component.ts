import { Component, Input, Output, EventEmitter, OnDestroy, ViewChild, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Router } from '@angular/router';
@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnDestroy,OnInit {

	@ViewChild('changeThemeSwal') private changeThemeSwal: any;
	@Input() sidebarVisible: boolean = true;
	@Input() navTab: string = "menu";
	@Input() currentActiveMenu:any;
	@Input() currentActiveSubMenu:any;
	@Output() changeNavTabEvent = new EventEmitter();
	@Output() activeInactiveMenuEvent = new EventEmitter();
    public darkClass: string = "";
	public themeColor: string = "#8950fc";
	public themeColors = ["#a27ce6", "#3eacff", "#49c5b6", "#50d38a", "#ffce4b", "#e47297", "#8950fc", "#7e6990"];
	public bgColor: string = "#E4E0EC";
	public bgColors = ["#E5E0EC", "#E3ECEF", "#E1ECEB", "#DEEAE4", "#EDEBE2", "#ECE0E4", "#E4E0EC", "#E4DDEA"];
    private ngUnsubscribe = new Subject();
	private isModeChange = false;
	username:string=''
	userPhoto:string=''

	constructor(
		private themeService: ThemeService,
		private storageService:TokenStorageService,
		private router:Router) {
		this.themeService.themeColorChange.pipe(takeUntil(this.ngUnsubscribe)).subscribe(themeColor => {
            this.themeColor = themeColor;
        });
		this.themeService.bgColorChange.pipe(takeUntil(this.ngUnsubscribe)).subscribe(bgColor => {
            this.bgColor = bgColor;
        });
        this.themeService.darkClassChange.pipe(takeUntil(this.ngUnsubscribe)).subscribe(darkClass => {
            this.darkClass = darkClass;
			this.setBackground(true);
        });
    }
	ngOnInit(): void {
		let token=this.storageService.getUser()
		if(token.jpegPhoto){
			this.userPhoto = "data:image/png;base64,"+token.jpegPhoto 
		}
		else{
			this.userPhoto = "data:image/png;base64,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"
		}
		this.username=token.name
		//throw new Error('Method not implemented.');
	}
    
    ngOnDestroy() {
         
        this.ngUnsubscribe.complete();
    }

	signOut(){
		this.storageService.signOut()
		this.router.navigate(['/authentication/page-login'])
	}

	changeNavTab(tab: string) {
		this.navTab = tab;
	}

	activeInactiveMenu(menuItem: string) {
		this.activeInactiveMenuEvent.emit({ 'item': menuItem });
	}
    
    changeDarkMode(darkClass: string) {
        this.themeService.changeDarkMode(darkClass);
    }

	handleThemeColorChange($event:any) {
		this.themeService.setThemeColor($event.color.hex);
		this.setBackground();
	}

	handleBgColorChange($event:any) {
		this.themeService.setBgColor($event.color.hex);
	}

	setBackground(isModeChange = false) {
		let index = this.themeColors.indexOf(this.themeColor);
		this.isModeChange = isModeChange;
		if(this.darkClass == "full-dark") {
			this.bgColors = ["#1D1B1E", "#1F2123", "#1F2323", "#202523", "#21211E", "#272223", "#232125", "#25252A"];
		} else {
			this.bgColors = ["#E5E0EC", "#E3ECEF", "#E1ECEB", "#DEEAE4", "#EDEBE2", "#ECE0E4", "#E4E0EC", "#E4DDEA"];
		}
		if(index > -1) {
			this.changeThemeSwal.fire();
		} else if (isModeChange) {
			if(this.darkClass == "full-dark") {
				this.changeBgColor("#2b2b35");
			} else {
				this.changeBgColor("#f4f7f6");
			}
		}
	}

	changeMatchingBgColor() {
		let index = this.themeColors.indexOf(this.themeColor);
		this.changeBgColor(this.bgColors[index]);
	}

	cancelChangeMatchingColor() {
		if (this.isModeChange) {
			if(this.darkClass == "full-dark") {
				this.changeBgColor("#2B2B35");
			} else {
				this.changeBgColor("#F4F7F6");
			}
		}
	}

	changeBgColor(color:string){
		this.themeService.setBgColor(color);
		this.isModeChange = false;
	}
}


