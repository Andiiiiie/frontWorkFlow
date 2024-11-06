import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Step} from "../../../../models/step";
import { Task } from '../../../../models/task';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {StepService} from "../../../../services/step.service";
import {MatDialog} from "@angular/material/dialog";
import {TaskService} from "../../../../services/task.service";
import Swal from "sweetalert2";
import {StepFormComponent} from "../step-form/step-form.component";
import {TaskFormComponent} from "../../task/task-form/task-form.component";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-step-config',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    RouterLink,

  ],
  templateUrl: './step-config.component.html',
  styleUrls: ['./step-config.component.css']
})
export class StepConfigComponent implements OnInit,OnDestroy{
  step: Step = {} as Step;
  tasks: Task[] = [];

  constructor(private route: ActivatedRoute, private router: Router,private stepService:StepService,private taskService:TaskService,private  cdr:ChangeDetectorRef,private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.setStep(params['id']);
    });
  }

  setStep(id:number) {
    this.stepService.getStepById(id).subscribe({
      next: step => {
        this.step = step;
        this.setTasks();
        this.cdr.detectChanges();
      },
      error: error => {
        console.error(error);
      }
    });
  }

  setTasks()
  {
    this.taskService.getTasksByStep(this.step.id).subscribe({
      next: tasks => {
        this.tasks = tasks;
        this.sortStepsByLevelAsc();
      },
      error: error => {
        console.error(error);
      }
    });
  }

  up(task:Task): void {
    const index = this.tasks.indexOf(task);
    if (index > 0) {
      [this.tasks[index].order, this.tasks[index - 1].order] = [this.tasks[index - 1].order, this.tasks[index].order];
      this.sortStepsByLevelAsc();
      this.cdr.detectChanges();
    }
  }

  down(task:Task): void {
    const index = this.tasks.indexOf(task);
    if (index < this.tasks.length - 1) {
      [this.tasks[index].order, this.tasks[index + 1].order] = [this.tasks[index + 1].order, this.tasks[index].order];
      this.sortStepsByLevelAsc();
      this.cdr.detectChanges();
    }
  }


  save()
  {
    this.tasks.forEach(task => {
      this.taskService.updateTask(task).subscribe({
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
    this.setTasks();
  }


  sortStepsByLevelAsc(): void {
    this.tasks.sort((a, b) => a.order - b.order);
    this.cdr.detectChanges();
  }

  addTask()
  {
    const dialogRef = this.dialog.open(TaskFormComponent,{data: {id: this.step.id}});
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog result:', result);
    });
  }

  ngOnDestroy(): void {
    if(this.dialog)
    {
      this.dialog.closeAll();
    }
  }





}
