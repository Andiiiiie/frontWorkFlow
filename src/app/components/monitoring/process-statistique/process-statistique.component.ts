import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProcessService} from "../../../services/process.service";
import {ProcessTypeService} from "../../../services/processType.service";
import {PieStatComponent} from "../pie-stat/pie-stat.component";

@Component({
  selector: 'app-process-statistique',
  standalone: true,
  imports: [
    PieStatComponent
  ],
  templateUrl: './process-statistique.component.html',
  styleUrl: './process-statistique.component.css'
})
export class ProcessStatistiqueComponent implements OnInit{
  totalOnGoingProcess: number = 0;
  totalFinishedProcess: number = 0;
  totalConfiguratedProcessTypes: number = 0;
  totalOnGoingConfigurationProcessTypes: number = 0;

  constructor(private route: ActivatedRoute,private cdr: ChangeDetectorRef,
              private router: Router,private processService: ProcessService,private processTypeService: ProcessTypeService) {
  }
  ngOnInit(): void {
    this.setNumbers();
  }


  setNumbers()
  {
    this.setTotalOnGoingProcess();
    this.setTotalFinishedProcess();
    this.setTotalConfiguratedProcessTypes();
    this.setTotalOnGoingConfigurationProcessTypes();
    this.cdr.detectChanges();
  }


  setTotalOnGoingProcess() {
    this.processService.getTotalOnGoingProcess().subscribe(
      data => {
        this.totalOnGoingProcess = data;
      },
      error => {
        console.error('Erreur lors de la récupération du nombre total de processus en cours', error);
      }
    );
  }

  setTotalFinishedProcess() {
    this.processService.getTotalFinishedProcess().subscribe(
      data => {
        this.totalFinishedProcess = data;
      },
      error => {
        console.error('Erreur lors de la récupération du nombre total de processus terminés', error);
      }
    );
  }

  setTotalConfiguratedProcessTypes() {
    this.processTypeService.getTotalConfiguratedProcessTypes().subscribe(
      data => {
        this.totalConfiguratedProcessTypes = data;
      },
      error => {
        console.error('Erreur lors de la récupération du nombre total de types de processus configurés', error);
      }
    );
  }

  setTotalOnGoingConfigurationProcessTypes() {
    this.processTypeService.getTotalOnGoingConfigurationProcessTypes().subscribe(
      data => {
        this.totalOnGoingConfigurationProcessTypes = data;
      },
      error => {
        console.error('Erreur lors de la récupération du nombre total de types de processus en cours de configuration', error);
      }
    );
  }



}
