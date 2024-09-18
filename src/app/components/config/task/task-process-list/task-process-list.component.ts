import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TaskService} from "../../../../services/task.service";
import {ProcessService} from "../../../../services/process.service";
import { Task } from '../../../../models/task';
import {Process} from "../../../../models/process";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-task-process-list',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './task-process-list.component.html',
  styleUrl: './task-process-list.component.css'
})
export class TaskProcessListComponent implements OnInit{
  task: Task = {} as Task;
  processes:Process[]=[];
  constructor(private route:ActivatedRoute,private  cdr:ChangeDetectorRef,private  taskService:TaskService,private processService:ProcessService) {
    this.route.paramMap.subscribe(params => {
      let id = params.get('id');
      if (id) {
        this.setTask(id);
      }
    });
  }
  ngOnInit(): void {

  }

  setTask(id:string)
  {
    this.taskService.getTaskById(id).subscribe({
      next: task => {
        this.task = task;
        this.setProcesses();
        this.cdr.detectChanges();
      },
      error: error => {
        console.error(error);
      }
    });
  }

  setProcesses() {
    if (this.task) {
      this.processService.getByTask(this.task.idTask.toString()).subscribe({
        next: processes => {
          this.processes = processes;
          this.cdr.detectChanges();
        },
        error: error => {
          console.error(error);
        }
      });
    }
  }

}
