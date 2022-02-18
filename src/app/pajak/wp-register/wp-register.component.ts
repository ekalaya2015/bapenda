import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { Merchant } from '../merchant';
import { DataService } from 'src/app/services/data.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-bootstrap-spinner';
@Component({
  selector: 'app-wp-register',
  templateUrl: './wp-register.component.html',
  styleUrls: ['./wp-register.component.css']
})
export class WpRegisterComponent implements OnInit {
	public sidebarVisible: boolean = true;
  merchant=new Merchant()
  constructor(private sidebarService: SidebarService, 
              private cdr: ChangeDetectorRef,
              private dataService:DataService,
              private toastrService:ToastrService,
              private router:Router,
              private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
  }
	toggleFullWidth() {
		this.sidebarService.toggle();
		this.sidebarVisible = this.sidebarService.getStatus();
		this.cdr.detectChanges();
	}

  onSubmit(merchantform){
    this.dataService.addmerchant(this.merchant).subscribe(
      data=>{
        this.toastrService.info('Proses registrasi sukses', undefined, {
          closeButton: true,
          positionClass: 'toast-bottom-center'
        });
        //this.router.navigate(['/admin/pajak'])
        merchantform.resetForm()        
      },
      error=>{
        this.toastrService.error('Proses registrasi gagal', undefined, {
          closeButton: true,
          positionClass: 'toast-bottom-center'
        });
      }
    )
  }
}
