import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {ProcessTypeService} from "../../../../services/processType.service";
import {StepService} from "../../../../services/step.service";
import {Step} from "../../../../models/step";
import {ProcessType} from "../../../../models/processType";
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-process-type-config',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    RouterLink
  ],
  templateUrl: './process-type-config.component.html',
  styleUrl: './process-type-config.component.css'
})
export class ProcessTypeConfigComponent implements OnInit{
  steps: Step[] = [];
  newStep: Step = {} as Step;
  error: string | null = null;
  successMessage: string | null = null;
  processType:ProcessType={} as ProcessType;

  constructor(private route: ActivatedRoute, private router: Router, private processTypeService:ProcessTypeService,private  cdr:ChangeDetectorRef, private stepService:StepService) {

  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let id = params.get('id');
      if (id) {
        this.setProcessType(id);
      }
    });
  }

  setSteps()
  {
    this.stepService.getStepsByProcessTypeId(this.processType.idProcessType.toString()).subscribe({
      next: steps => {
        this.steps = steps;
        this.cdr.detectChanges();
      },
      error: error => {
        console.error(error);
        this.error = "Erreur lors du chargement des étapes";
      }
    })
  }

  setProcessType(id:string){
    this.processTypeService.getProcessTypesById(id).subscribe({
      next: processType => {
        this.processType = processType;
        this.setSteps();
        this.cdr.detectChanges();
      },
      error: error => {
        console.error(error);
        this.error = "Erreur lors du chargement du type de processus";
      }
    })
  }

  onSubmit(){
    this.newStep.order=this.getMax()+1;
    this.newStep.state=0;
    this.newStep.idProcessType=this.processType.idProcessType;
    this.steps.push(this.newStep);
    this.newStep={} as Step;
    this.sortStepsByLevelAsc();
  }

  getMax(): number{
    let max = 0;
    this.steps.forEach(step => {
      if(step.order > max){
        max = step.order;
      }
    });
    return max
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
    }
  }

  down(step: Step): void {
    const index = this.steps.indexOf(step);
    if (index < this.steps.length - 1) {
      [this.steps[index].order, this.steps[index + 1].order] = [this.steps[index + 1].order, this.steps[index].order];
      this.sortStepsByLevelAsc();
    }
  }


  save()
  {
    alert("save");
    this.steps.forEach(step => {
      console.log(step)
      if(step.idStep==null)
      {
        console.log("create")
        this.stepService.createStep(step).subscribe({
          next: (response) => {
            // Handle successful creation, e.g., add to steps array or navigate
            this.error = null; // Clear any previous error
          },error: (error) => {
            // Handle error
            console.error("Error getting steps:", error);
            this.error = "An error occurred while creating the step."; // Set your error message here
          }
        });
      }
      else {
        console.log("update")
        this.stepService.updateStep(step).subscribe({
          next: (response) => {
            // Handle successful creation, e.g., add to steps array or navigate
            this.error = null; // Clear any previous error
          },
          error: (error) => {
            // Handle error
            console.error("Error getting steps:", error);
            this.error = "An error occurred while creating the task."; // Set your error message here
          }
        });
      }
    });
    this.setSteps();
  }

}
