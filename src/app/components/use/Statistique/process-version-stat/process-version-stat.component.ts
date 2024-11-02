import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {Chart, registerables} from "chart.js";
import {ProcessType} from "../../../../models/process-type";
import {ProcessTypeService} from "../../../../services/process-type.service";
import {ProcessCountByMonth} from "../../../../models/stat/process-count-by-month";
import {StatisticService} from "../../../../services/statistic.service";
import {ProcessTypeVersionCount} from "../../../../models/stat/process-type-version-count";
import {FormsModule} from "@angular/forms";
import {CommonModule, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-process-version-stat',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    CommonModule
  ],
  templateUrl: './process-version-stat.component.html',
  styleUrl: './process-version-stat.component.css'
})
export class ProcessVersionStatComponent  implements AfterViewInit {
  @ViewChild('myChart') myChart!: ElementRef<HTMLCanvasElement>;
  selectedDateTime:String = new Date().toISOString();
  selectDateTimeObject: Date = new Date();
  processTypeStat: ProcessTypeVersionCount[] = [];
  private chartInstance: Chart | null = null;


  constructor(private statisticService: StatisticService) {
    Chart.register(...registerables);
    this.setProcessTypeStat();

  }

  ngAfterViewInit(): void {
    this.setProcessTypeStat();
    this.graphInit()
  }

  setProcessTypeStat() {
    this.statisticService.getProcessTypeVersionStat(this.selectedDateTime).subscribe(
      data => {
        this.processTypeStat = data;
        this.graphInit();
      },
      error => {
        console.log(error);
      }
    )
  }

  onDateTimeChange(value: string): void {
    this.selectedDateTime = value;
    this.selectDateTimeObject = new Date(value);
    console.log("Date et heure sélectionnées :", this.selectedDateTime);
    this.setProcessTypeStat();
  }

  private generateColors(count: number, opacity: number): string[] {
    const colors = [
      'rgba(255, 99, 132, OPACITY)',
      'rgba(54, 162, 235, OPACITY)',
      'rgba(255, 206, 86, OPACITY)',
      'rgba(75, 192, 192, OPACITY)',
      'rgba(153, 102, 255, OPACITY)',
      'rgba(255, 159, 64, OPACITY)',
    ];
    return Array.from({ length: count }, (_, i) => colors[i % colors.length].replace('OPACITY', opacity.toString()));
  }

  graphInit() {
    if(this.processTypeStat.length != 0) {
      const ctx = this.myChart.nativeElement.getContext('2d');
      if (ctx) {
        if (this.chartInstance) {
          this.chartInstance.destroy();
        }
        this.chartInstance= new Chart(ctx, {
          type: 'bar',  // Graphique en colonne
          data: {
            labels: this.processTypeStat.map(p => p.typeName),  // Labels des types de processus
            datasets: [{
              label: 'Nombre de Versions',
              data: this.processTypeStat.map(p=>p.version), // Données de nombre de versions
              backgroundColor: this.generateColors(this.processTypeStat.length, 0.2),
              borderColor: this.generateColors(this.processTypeStat.length, 1),
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Nombre de Versions'
                }
              },
              x: {
                title: {
                  display: true,
                  text: 'Type de Processus'
                }
              }
            },
            plugins: {
              legend: {
                display: true,
                position: 'top'
              }
            }
          }
        });
      }
    }

  }

}
