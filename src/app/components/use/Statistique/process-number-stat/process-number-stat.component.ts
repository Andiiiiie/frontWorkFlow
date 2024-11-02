import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {ProcessType} from "../../../../models/process-type";
import {ProcessCountByMonth} from "../../../../models/stat/process-count-by-month";
import {ProcessTypeService} from "../../../../services/process-type.service";
import {StatisticService} from "../../../../services/statistic.service";
import {Chart, registerables} from "chart.js";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-process-number-stat',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './process-number-stat.component.html',
  styleUrl: './process-number-stat.component.css'
})
export class ProcessNumberStatComponent implements AfterViewInit {
  @ViewChild('myChart') myChart!: ElementRef<HTMLCanvasElement>;
  processTypes:ProcessType[] = [];
  years:number[] = [];
  processType:ProcessType={} as ProcessType;
  year:number = new Date().getFullYear();
  processCountByMonth:ProcessCountByMonth[] = [];
  private chartInstance: Chart | null = null;

  constructor(private processTypeService:ProcessTypeService,private statisticService:StatisticService) {
    Chart.register(...registerables);
    this.setProcessTypes();
    this.setYears(2021,2025);
  }

  ngAfterViewInit(): void {
    this.graphInit()
  }

  setProcessTypes()
  {
    this.processTypeService.listAllProcessTypes().subscribe(
      data => {
        this.processTypes = data;
      },
      error => {
        console.log(error);
      }
    )
  }

  setYears(start:number, end:number) {
    for (let i = start; i <= end; i++) {
      this.years.push(i);
    }
  }


  onSubmit()
  {
    if(this.processType.id)
    {
      this.statisticService.getProcessCountByMonth(this.year,this.processType.id).subscribe(
        data => {
          this.processCountByMonth = data;
          this.graphInit();
        },
        error => {
          console.log(error);
        }
      );
    }
  }


  graphInit() {
    if(this.processCountByMonth.length>0)
    {
      const ctx = this.myChart.nativeElement.getContext('2d');
      if (ctx) {
        if (this.chartInstance) {
          this.chartInstance.destroy();
        }
        this.chartInstance=new Chart(ctx, {
          type: 'line',  // Changer ici pour un graphique en courbe
          data: {
            labels: this.processCountByMonth.map(p => p.month),
            datasets: [{
              label: 'Nombre de processus '+this.processType.name,
              data: this.processCountByMonth.map(p => p.count),
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              fill: false, // Optionnel : désactive le remplissage sous la courbe
              tension: 0.1 // Adoucit la courbe (entre 0 et 1)
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      }
    }
  }
}
