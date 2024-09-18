import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProcessService} from "../../../../services/process.service";
import {TaskService} from "../../../../services/task.service";
import {ProcessType} from "../../../../models/processType";
import {Process} from "../../../../models/process";
import {ProcessTypeService} from "../../../../services/processType.service";
import Swal from "sweetalert2";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-process-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './process-form.component.html',
  styleUrl: './process-form.component.css'
})
export class ProcessFormComponent implements OnInit{
  processType: ProcessType = {} as ProcessType;
  newProcess:Process={} as Process;
  constructor(private route:ActivatedRoute,private cdr:ChangeDetectorRef,private processService:ProcessService,private processeTypeService:ProcessTypeService) {
    this.route.paramMap.subscribe(params => {
      let id = params.get('id');
      if (id) {
        this.setProcessType(id);
      }
    });
  }

  setProcessType(id:string){
    this.processeTypeService.getProcessTypesById(id).subscribe({
      next: processType => {
        this.processType = processType;
        this.cdr.detectChanges();
      },
      error: error => {
        console.error(error);
      }
    });
  }

  onSubmit()
  {
    this.newProcess.idProcessType=this.processType.idProcessType;
    this.processService.createProcess(this.newProcess).subscribe({
      next: process => {
        Swal.fire({
          title: 'Success!',
          text: 'Process Type Added Successfully',
          icon: 'success'
        })
        this.newProcess={} as Process;
      },
      error: error => {
        Swal.fire({
          title: 'Error!',
          text: error.message,
          icon: 'error'
        });
        console.error(error);
      }
    });
  }
  ngOnInit(): void {
    }

}
