import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ProcessType} from "../../../../models/processType";
import { Task } from '../../../../models/task';
import {ProcessTypeService} from "../../../../services/processType.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {TaskService} from "../../../../services/task.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-process-type-info',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './process-type-info.component.html',
  styleUrl: './process-type-info.component.css'
})
export class ProcessTypeInfoComponent implements OnInit{
  processType: ProcessType = {} as ProcessType;
  tasks: Task[] = [];
  error:string | null = null;
  constructor(private route: ActivatedRoute, private router: Router, private processTypeService:ProcessTypeService,private  cdr:ChangeDetectorRef, private taskService:TaskService) {
    this.route.paramMap.subscribe(params => {
      let id = params.get('id');
      if (id) {
        this.setProcessType(id);
      }
    });

  }


  ngOnInit(): void {

  }

  setProcessType(id:string){
    this.processTypeService.getProcessTypesById(id).subscribe({
      next: processType => {
        this.processType = processType;
        this.setTasks();
        this.cdr.detectChanges();
      },
      error: error => {
        console.error(error);
        this.error = "Erreur lors du chargement des étapes";
      }
    });
  }

  setTasks(){
    if(this.processType)
    {
      this.processTypeService.getTasks(this.processType.idProcessType.toString()).subscribe({
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

}
