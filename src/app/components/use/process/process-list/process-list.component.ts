import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {ProcessService} from "../../../../services/process.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import { Process } from '../../../../models/process';
import {ProcessType} from "../../../../models/processType";
import {ProcessTypeService} from "../../../../services/processType.service";

@Component({
  selector: 'app-process-list',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    ReactiveFormsModule,
    RouterLink,
    NgIf
  ],
  templateUrl: './process-list.component.html',
  styleUrl: './process-list.component.css'
})
export class ProcessListComponent implements OnInit{
  processes: Process[] = [];
  processTypes: ProcessType[] = [];
  selectedProcessType: string = '';
  constructor(private route: ActivatedRoute, private router: Router,private cdr: ChangeDetectorRef,private processService:ProcessService,private processTypeService:ProcessTypeService) {
  }
  ngOnInit(): void {
    this.setProcesses();
    this.setProcessTypes();
  }

  setProcesses() {
    this.processService.getProcesses().subscribe({
      next: processes => {
        this.processes = processes;
      },
      error: error => {
        console.error(error);
      }
    });
  }

  setProcessTypes() {
    this.processTypeService.getProcessTypesByState("1").subscribe({
      next: processTypes => {
        this.processTypes = processTypes;
        this.cdr.detectChanges();
      },
      error: error => {
        console.error(error);
      }
    });
  }

  onChangeType()
  {
    this.processService.getProcessesByType(this.selectedProcessType).subscribe({
      next: processes => {
        this.processes = processes;
        console.log(processes);
        this.cdr.detectChanges();
      },
      error: error => {
        console.error(error);
      }
    });
  }



}
