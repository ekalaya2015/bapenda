import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { DataService } from 'src/app/services/data.service';
import { NgxSpinnerService } from 'ngx-bootstrap-spinner';
@Component({
  selector: 'app-wp-list',
  templateUrl: './wp-list.component.html',
  styleUrls: ['./wp-list.component.css']
})
export class WpListComponent implements OnInit {
	public sidebarVisible: boolean = true;
  public merchantlist=[{}]
  constructor(private sidebarService: SidebarService, 
    private cdr: ChangeDetectorRef,
    private dataService:DataService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getMerchantList()
  }

  getMerchantList(){
    this.spinner.show()
    this.dataService.listmerchant().subscribe(
      data=>{
        data['Records'].forEach(element => {
          this.merchantlist.push({
            merchant_id:element[0]['stringValue'],
            owner:element[1]['stringValue'],
            nik:element[2]['stringValue'],
            email:element[3]['stringValue'],
            nama_usaha:element[4]['stringValue'],
            alamat:element[5]['stringValue'],
            kategori:element[6]['stringValue'],
            data_source:element[7]['stringValue']})
        });
        this.spinner.hide()
      }
    )

  }

	toggleFullWidth() {
		this.sidebarService.toggle();
		this.sidebarVisible = this.sidebarService.getStatus();
		this.cdr.detectChanges();
	}
}
