import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {StepService} from "../../../../services/step.service";
import {TaskService} from "../../../../services/task.service";
import {ResultTypeService} from "../../../../services/resultType.service";
import { Task } from '../../../../models/task';
import {Resulter} from "../../../../models/resulter";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {Step} from "../../../../models/step";
import {ResultType} from "../../../../models/resultType";

@Component({
  selector: 'app-task-config',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    ReactiveFormsModule
  ],
  templateUrl: './task-config.component.html',
  styleUrl: './task-config.component.css'
})
export class TaskConfigComponent implements OnInit{
  task: Task = {} as Task;
  resulters: Resulter[] = [];
  newResulter:Resulter = {} as Resulter;
  error: string | null = null;
  successMessage: string | null = null;
  steps: Step[] = [];
  selectedStep:Step={} as Step;
  resultTypes:ResultType[]=[];
  tasks: Task[] = [];
  constructor(private route: ActivatedRoute, private router: Router,private  cdr:ChangeDetectorRef, private stepService:StepService,private  taskService:TaskService,private resultTypeService:ResultTypeService) {
  this.route.paramMap.subscribe(params => {
    let id = params.get('id');
    if (id) {
      this.setTask(id);
    }
  })
  }

  ngOnInit(): void {
  }

  setTask(id:string){
    this.taskService.getTaskById(id).subscribe({
      next: task => {
        this.task = task;
        this.setSteps();
        this.setResultypes();
        this.setResulters();
        this.setTasks();
        this.cdr.detectChanges();
      },
      error: error => {
        console.error(error);
        this.error = "Erreur lors du chargement des tâches";
      }
    })
  }

  setResulters(){
    if(this.task){
      this.taskService.getResulters(this.task.idTask.toString()).subscribe({
        next: resulters => {
          this.resulters = resulters;
          console.log(resulters);
          this.cdr.detectChanges();
        },
        error: error => {
          console.error(error);
          this.error = "Erreur lors du chargement des resulters";
        }
      })
    }
  }

  setSteps(){
    if(this.task){
      this.taskService.getStepsByTask(this.task.idTask.toString()).subscribe({
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
  }

  setResultypes(){
    if(this.task){
      this.resultTypeService.getResultTypes().subscribe(
        {
          next: resultTypes => {
            this.resultTypes = resultTypes;
            this.cdr.detectChanges();
          },
          error: error => {
            console.error("Error getting result types:", error);
            this.error = "An error occurred while creating the task.";
          }
        }
      );
    }
  }

  setTasks(idStep:string|null=null){
    if(idStep)
    {
      this.taskService.getTasksByStep(idStep).subscribe({
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

  onChangeSelectedStep()
  {
    this.setTasks(this.selectedStep.idStep.toString())
  }

  onSubmit(){
    if(this.task){
      this.newResulter.idTask=this.task.idTask;
      if(this.newResulter.idNextTask==0)
      {
        this.newResulter.ending=true;
      }
      else
      {
        this.newResulter.ending=false;
      }
      //enregistrer
      this.taskService.saveResult(this.newResulter).subscribe({
        next: (response) => {
          this.resulters.push(this.newResulter);
          this.newResulter={} as Resulter;
          // Handle successful creation, e.g., add to tasks array or navigate
          this.error = null; // Clear any previous error
          this.cdr.detectChanges();
        },
        error: (error) => {
          // Handle error
          alert("adding result error "+error);
          // console.error("Error getting task:", error);
          this.error = "An error occurred while creating the task."; // Set your error message here
        }
      });
    }
  }


}
