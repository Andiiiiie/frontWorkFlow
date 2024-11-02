import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [],
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css'] // Correction du styleUrl en styleUrls
})
export class BarChartComponent implements AfterViewInit {
  @ViewChild('myChart') myChart!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit(): void {
    console.log("Token: " + localStorage.getItem('token'));

    // Enregistrer les composants nécessaires pour Chart.js
    Chart.register(...registerables);

    const ctx = this.myChart.nativeElement.getContext('2d');
    if (ctx) {
      // Simulation de données pour le graphique
      const labels = ['Type A', 'Type B', 'Type C', 'Type D', 'Type E', 'Type F'];
      const data = [12, 19, 3, 5, 2, 3]; // Remplacez ces valeurs par vos données réelles si nécessaire

      new Chart(ctx, {
        type: 'bar', // Type de graphique
        data: {
          labels: labels,
          datasets: [{
            label: 'Nombre de Versions', // Étiquette du dataset
            data: data,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderWidth: 1 // Épaisseur de la bordure
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true // Commence l'axe Y à 0
            }
          }
        }
      });
    }
  }
}
