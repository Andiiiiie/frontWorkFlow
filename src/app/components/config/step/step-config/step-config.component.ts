import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgClass, NgForOf} from "@angular/common";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {ProcessTypeService} from "../../../../services/processType.service";
import {StepService} from "../../../../services/step.service";
import {Step} from "../../../../models/step";
import { Task } from '../../../../models/task';
import {TaskService} from "../../../../services/task.service";

@Component({
  selector: 'app-step-config',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgClass,
    RouterLink
  ],
  templateUrl: './step-config.component.html',
  styleUrl: './step-config.component.css'
})
export class StepConfigComponent implements OnInit{
  step: Step = {} as Step;
  tasks: Task[] = [];
  newTask: Task = {} as Task;
  error: string | null = null;
  successMessage: string | null = null;
  constructor(private route: ActivatedRoute, private router: Router, private processTypeService:ProcessTypeService,private  cdr:ChangeDetectorRef, private stepService:StepService,private  taskService:TaskService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let id = params['id'];
      if (id) {
        this.setStep(id);
      }
    });
  }


  setStep(id: string){
    this.stepService.getStepById(id).subscribe({
      next: step => {
        this.step = step;
        this.setTasks();
        this.cdr.detectChanges();
      },
      error: error => {
        console.error(error);
        this.error = "Erreur lors du chargement des étapes";
      }
    })
  }

  setTasks(){
    if(this.step)
    {
      this.taskService.getTasksByStep(this.step.idStep.toString()).subscribe({
        next: tasks => {
          this.tasks = tasks;
          this.cdr.detectChanges();
        },
        error: error => {
          console.error(error);
          this.error = "Erreur lors du chargement des tâches";
        }
      });
    }
  }

  onSubmit(){
    this.newTask.idStep=this.step.idStep;
    this.newTask.state=0;
    this.taskService.createTask(this.newTask).subscribe({
      next: task => {
        this.tasks.push(task);
        this.setTasks();
        this.newTask={} as Task;
        this.successMessage = "Tâche créée avec succès";
        this.cdr.detectChanges();
      },
      error: error => {
        console.error(error);
        this.error = "Erreur lors de la création de la tâche";
      }
    });
  }
}
