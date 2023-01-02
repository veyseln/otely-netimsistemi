import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from 'src/app/components';
import { ApexChart, ApexDataLabels, ApexNonAxisChartSeries, ApexTitleSubtitle } from 'ng-apexcharts';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  chartSeries: ApexNonAxisChartSeries = [10, 21, 6, 41,13,47];

  chartDetails: ApexChart = {
    type: 'pie',
    toolbar: {
      show: true

    }
  };
  chartLabels = ["Cender Hotel", "Lara Beach", "Citrus Park Hotel", "Anelli Hotel","Hotel Luna Antalya","Ramada Plaza Antalya Hotel"];

  chartTitle: ApexTitleSubtitle = {
    text: '',
    align: 'center',

  };

  chartDataLabels: ApexDataLabels = {
    enabled: true,

  };
  constructor() { }

  ngOnInit() {
  }

}
