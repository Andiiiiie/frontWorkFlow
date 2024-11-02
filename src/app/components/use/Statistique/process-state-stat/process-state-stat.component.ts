import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {ProcessType} from "../../../../models/process-type";
import {ProcessCountByState} from "../../../../models/stat/process-count-by-state";
import {Chart, registerables} from "chart.js";
import {ProcessTypeService} from "../../../../services/process-type.service";
import {StatisticService} from "../../../../services/statistic.service";
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-process-state-stat',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf
  ],
  templateUrl: './process-state-stat.component.html',
  styleUrl: './process-state-stat.component.css'
})
export class ProcessStateStatComponent implements  AfterViewInit{
  @ViewChild('myChart') myChart!: ElementRef<HTMLCanvasElement>;
  processTypes:ProcessType[] = [];
  processCountByState:ProcessCountByState[] = [];
  idType:number = 0;

  constructor(private processTypeService:ProcessTypeService,private statisticService:StatisticService) {
    Chart.register(...registerables);
    this.setProcessTypes();
  }

  ngAfterViewInit(): void {
    this.setProcessCountByState();
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

  setProcessCountByState()
  {
    if(this.idType==0)
    {
      this.statisticService.getProcessCountByState().subscribe(
        data => {
          this.processCountByState = data;
          this.graphInit();
        },
        error => {
          console.log(error);
        }
      );
    }
    else
    {
      this.statisticService.getProcessCountByStateFilter(this.idType).subscribe(
        data => {
          this.processCountByState = data;
          this.graphInit();
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  generateRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const a = 0.2; // Opacité pour le fond
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }

  generateRandomBorderColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const a = 1; // Opacité pour la bordure
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }

  graphInit()
  {
    if(this.processCountByState.length>0)
    {
      const ctx = this.myChart.nativeElement.getContext('2d');
      if (ctx) {
        const numberOfDataPoints = this.processCountByState.length;
        const backgroundColors = Array.from({ length: numberOfDataPoints }, () => this.generateRandomColor());
        const borderColors = Array.from({ length: numberOfDataPoints }, () => this.generateRandomBorderColor());
        new Chart(ctx, {
          type: 'pie',  // Type de graphique en secteur
          data: {
            labels: this.processCountByState.map(p => p.name),
            datasets: [{
              label: 'Process number',
              data: this.processCountByState.map(p => p.count),
              backgroundColor: backgroundColors,
              borderColor: borderColors,
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,  // Le graphique s'adapte à la taille de l'écran
            plugins: {
              legend: {
                display: true,  // Affiche la légende
                position: 'top', // Position de la légende
              },
              tooltip: {
                callbacks: {
                  label: function(tooltipItem) {
                    return tooltipItem.label + ': ' + tooltipItem.raw; // Personnaliser le tooltip
                  }
                }
              }
            }
          }
        });
      }
    }
  }

  onTypeChange(selectedType:number)
  {
    this.idType = selectedType;
    this.setProcessCountByState();
  }
}
