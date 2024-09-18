import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartType, ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-pie-stat',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './pie-stat.component.html',
  styleUrls: ['./pie-stat.component.css']
})
export class PieStatComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {}

  public pieChartLabels: string[] = ['Processus A', 'Processus B', 'Processus C'];
  public pieChartData: ChartData<'pie', number[], string> = {
    labels: this.pieChartLabels,
    datasets: [{
      data: [300, 500, 100],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
    }]
  };
  public pieChartType: 'pie' = 'pie';  // Ensure the type is 'pie'

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    }
  };
}
