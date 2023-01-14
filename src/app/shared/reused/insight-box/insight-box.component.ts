import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-insight-box',
  templateUrl: './insight-box.component.html',
  styleUrls: ['./insight-box.component.scss']
})
export class InsightBoxComponent implements OnInit{
  @Input() title : any;
  @Input() percent : any;
  @Input() color : any;
  @Input() icon : any;
  @Input() classList : any;
  @Input() price : any;
  percentage: any

  ngOnInit(): void {
    let price = parseInt(this.price);
    console.log(typeof price, price);
    this.percentage = price - (price * 90 / 100)
    console.log(this.percentage);
  }
 }
