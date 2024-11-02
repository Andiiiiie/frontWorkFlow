import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {ProcessTypeService} from "../../../../services/process-type.service";
import {ProcessTypeVersionService} from "../../../../services/process-type-version.service";
import Swal from "sweetalert2";
import {ProcessTypeVersion} from "../../../../models/process-type-version";
import {Step} from "../../../../models/step";
import {StepService} from "../../../../services/step.service";
import {ProcessTypeVersionFormComponent} from "../process-type-version-form/process-type-version-form.component";
import {MatDialog} from "@angular/material/dialog";
import {StepFormComponent} from "../../step/step-form/step-form.component";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-process-type-version-config',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf,
    NgIf
  ],
  templateUrl: './process-type-version-config.component.html',
  styleUrls: ['./process-type-version-config.component.css']
})
export class ProcessTypeVersionConfigComponent implements OnInit {
  processTypeVersion: ProcessTypeVersion = {} as ProcessTypeVersion;
  steps:Step[]=[];

  constructor(private route: ActivatedRoute, private router: Router, private processTypeVersionService:ProcessTypeVersionService,private stepService:StepService,private  cdr:ChangeDetectorRef,private dialog: MatDialog) {
    this.route.paramMap.subscribe(params => {
      let id = params.get('id');
      if (id) {
        console.log("id",id)
        this.setProcessTypeVersion(Number(id));
      }
    });
  }

  ngOnInit(): void {

  }

  setProcessTypeVersion(id:number) {
    this.processTypeVersionService.getVersionById(id).subscribe({
      next: processTypeVersion => {
        this.processTypeVersion = processTypeVersion;
        console.log("version",this.processTypeVersion)
        console.log(this.processTypeVersion)
        this.setSteps()
        this.cdr.detectChanges();
      },
      error: error => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Erreur lors du chargement de la configuration de la version du type de processus'
        })
      }
    });
  }

  setSteps(){
    if(this.processTypeVersion)
    {
      console.log(this.processTypeVersion)
      console.log("id version",this.processTypeVersion.id)
      this.stepService.listStep(this.processTypeVersion.id).subscribe({
        next: steps => {
          this.steps = steps;
          this.cdr.detectChanges();
        },
        error: error => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error
          })
        }
      });
    }
  }


  sortStepsByLevelAsc(): void {
    this.steps.sort((a, b) => a.order - b.order);
    this.cdr.detectChanges();
  }



  up(step: Step): void {
    const index = this.steps.indexOf(step);
    if (index > 0) {
      [this.steps[index].order, this.steps[index - 1].order] = [this.steps[index - 1].order, this.steps[index].order];
      this.sortStepsByLevelAsc();
      this.cdr.detectChanges();
    }
  }

  down(step: Step): void {
    const index = this.steps.indexOf(step);
    if (index < this.steps.length - 1) {
      [this.steps[index].order, this.steps[index + 1].order] = [this.steps[index + 1].order, this.steps[index].order];
      this.sortStepsByLevelAsc();
      this.cdr.detectChanges();
    }
  }

  save()
  {
    this.steps.forEach(step => {
        console.log("update")
        alert("update "+step.id)
        this.stepService.updateStep(step).subscribe({
          next: (response) => {

          },
          error: (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Erreur lors de la sauvegarde des étapes'
            })
          }
        });
    });
    this.setSteps();
  }


  addStep()
  {
    const dialogRef = this.dialog.open(StepFormComponent,{data: {id: this.processTypeVersion.id}});
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog result:', result);
    });
  }

}
