import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { EChartsOption } from 'echarts';
import { DataService } from 'src/app/services/data.service';
import * as moment from 'moment';
import { NgxSpinnerService } from "ngx-bootstrap-spinner";
import { forkJoin, mergeMap } from 'rxjs';

@Component({
  selector: 'app-analitik',
  templateUrl: './analitik.component.html',
  styleUrls: ['./analitik.component.css']
})
export class AnalitikComponent implements OnInit {
  public totalvalue = '';
  public totalorder = '';
  public totalMonthValue=""
  public detailValueToday='';
  public detailOrderToday=''
  public detailTotalMonth=''
  public yesterdayEarns
  public previousMonth
  public yesterdayOrder
  public newArr = [{}]
  public pieData=[{}]
  public categories=[]
  public valuetrend='fa fa-arrow-down'
  public ordertrend='fa fa-arrow-down'
  public monthvaluetrend='fa fa-arrow-down'

  public sidebarVisible: boolean = true;
  public pieOptions:any={}

  constructor(private sidebarService: SidebarService, 
    private cdr: ChangeDetectorRef, 
    private dataService: DataService,
    private ngxspinner:NgxSpinnerService) {
  }

  ngOnInit(): void {
    this.getDetailTotalValue();
    this.getDetailTodayOrder();
    this.getDetailMonthValue();
    this.getTenLatestOrder();
    this.getEarnsByCategory()
  }

  getTenLatestOrder(){
    this.ngxspinner.show()
    this.dataService.latestorder().subscribe(
      data => {
        data['Records'].forEach(element => {
          this.newArr.push({ "invoice_id": element[0]['stringValue'], "merchant_id": element[2]['stringValue'], "total_value": element[3]['stringValue'], "created_at": element[1]['stringValue'] })
        });
        this.ngxspinner.hide()
      }
    )
  }

  getDetailTodayOrder(){
    const sToday = moment().startOf('day').format('YYYY-MM-DD HH:mm:sss')
    const eToday = moment().endOf('day').format('YYYY-MM-DD HH:mm:ss')
    const sYesterday = moment().subtract(1,'d').startOf('day').format('YYYY-MM-DD HH:mm:ss')
    const eYesterday = moment().subtract(1,'d').endOf('day').format('YYYY-MM-DD HH:mm:ss')
    this.ngxspinner.show()
    forkJoin(
      [this.dataService.totalorders(sToday,eToday),this.dataService.totalorders(sYesterday,eYesterday)]
    ).subscribe(
      data=>{
        this.totalorder=Number(data[0]['Records'][0][0]['longValue']).toLocaleString();
        let currentVal=Number(data[0]['Records'][0][0]['longValue'])||0
        this.yesterdayOrder=Number(data[1]['Records'][0][0]['longValue'])||0
        this.detailOrderToday=((currentVal-this.yesterdayOrder)/this.yesterdayOrder*100).toFixed()+'%'
        if (Math.sign(Number(currentVal-this.yesterdayOrder))==1){
          this.ordertrend='fa fa-arrow-up'
        }
        this.ngxspinner.hide();
      }
    )

  }

  getEarnsByCategory(){
    const sToday = moment().startOf('day').format('YYYY-MM-DD HH:mm:ss')
    const eToday = moment().endOf('day').format('YYYY-MM-DD HH:mm:ss')
    this.ngxspinner.show()
    this.dataService.earnbycategory(sToday,eToday).subscribe(
      data=>{
        data['Records'].forEach(element => {
          this.pieData.push({value:element[1]['stringValue'],name:element[0]['stringValue']})
          this.categories.push(element[0]['stringValue'])
        });
        this.pieOptions = {
          color: ["#49c5b6", "#e47297", "#a27ce6", "#ffce4b", "#3eacff"],
          title: {
            text: 'Kategori',
            subtext: 'Total Pendapatan berdasarkan kategori usaha',
            x: 'center',
            textStyle: {
              color: "#C2C2C2"
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: this.categories,
            textStyle: {
              color: "#C2C2C2"
            }
          },
          series: [
            {
              name: 'Kategori',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: this.pieData,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };        
        this.ngxspinner.hide();
      }
    )
  }

  getDetailTotalValue(){
    const sToday = moment().startOf('day').format('YYYY-MM-DD HH:mm:ss')
    const eToday = moment().endOf('day').format('YYYY-MM-DD HH:mm:ss')
    const sYesterday = moment().subtract(1,'d').startOf('day').format('YYYY-MM-DD HH:mm:ss')
    const eYesterday = moment().subtract(1,'d').endOf('day').format('YYYY-MM-DD HH:mm:ss')
    this.ngxspinner.show()
    forkJoin(
      [this.dataService.totalvalue(sToday,eToday),this.dataService.totalvalue(sYesterday,eYesterday)]
    ).subscribe(
      data=>{
        let currentVal=Number(data[0]['Records'][0][0]['stringValue'])||0
        this.yesterdayEarns=Number(data[1]['Records'][0][0]['stringValue'])||0
        this.totalvalue='Rp '+currentVal.toLocaleString();
        this.detailValueToday=((currentVal-this.yesterdayEarns)/this.yesterdayEarns*100).toFixed() +'%'
        if (Math.sign(Number(currentVal-this.yesterdayEarns))==1) {
          this.valuetrend='fa fa-arrow-up'
        }
        this.yesterdayEarns='Rp '+this.yesterdayEarns.toLocaleString()
        this.ngxspinner.hide();
      }
    )
  }

  getDetailMonthValue(){
    const startcurrMonth = moment().startOf('month').format('YYYY-MM-DD HH:mm:ss')
    const endcurrMonth = moment().endOf('month').format('YYYY-MM-DD HH:mm:ss')
    const startlastMonth = moment().subtract(1,'month').startOf('month').format('YYYY-MM-DD HH:mm:ss')
    const endLastMonth = moment().subtract(1,'month').endOf('month').format('YYYY-MM-DD HH:mm:ss')
    this.ngxspinner.show()
    forkJoin(
      [this.dataService.totalvalue(startcurrMonth,endcurrMonth),this.dataService.totalvalue(startlastMonth,endLastMonth)]
    ).subscribe(
      data=>{
        let currentVal=Number(data[0]['Records'][0][0]['stringValue'])||0
        this.previousMonth=Number(data[1]['Records'][0][0]['stringValue'])||0
        this.totalMonthValue='Rp '+currentVal.toLocaleString();
        this.detailTotalMonth=((currentVal-this.previousMonth)/this.previousMonth*100).toFixed() +'%'
        if (Math.sign(Number(currentVal-this.previousMonth))==1) {
          this.monthvaluetrend='fa fa-arrow-up'
        }
        this.previousMonth='Rp '+this.previousMonth.toLocaleString()
        this.ngxspinner.hide();
      }
    )
  }

  toggleFullWidth() {
    this.sidebarService.toggle();
    this.sidebarVisible = this.sidebarService.getStatus();
    this.cdr.detectChanges();
  }

}
