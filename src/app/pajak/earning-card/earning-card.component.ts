import { Component, OnInit,Input } from '@angular/core';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-earning-card',
  templateUrl: './earning-card.component.html',
  styleUrls: ['./earning-card.component.css']
})
export class EarningCardComponent implements OnInit {
  @Input() title: string = "";
  @Input() value: string = "";
  @Input() details: string = "";
  @Input() chartOptions: EChartsOption = {};

  public autoResize:boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
