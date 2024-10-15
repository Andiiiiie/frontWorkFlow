import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Process} from "../../../../models/process";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {ProcessService} from "../../../../services/process.service";
import {ProcessStateType} from "../../../../models/process-state-type";
import {ProcessType} from "../../../../models/process-type";
import {ProcessTypeService} from "../../../../services/process-type.service";
import {ProcessStateTypeService} from "../../../../services/process-state-type.service";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgForOf, NgIf} from "@angular/common";
@Component({
  selector: 'app-process-list',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './process-list.component.html',
  styleUrl: './process-list.component.css'
})
export class ProcessListComponent implements OnInit{
  processes: Process[] = [];
  size: number = 2;
  page: number = 1;
  filterForm: FormGroup;
  states: ProcessStateType[]=[];
  types: ProcessType[]=[];

  constructor(private route: ActivatedRoute, private router: Router, private processService:ProcessService,private processStateTypeService:ProcessStateTypeService,private processTypeService:ProcessTypeService,private  cdr:ChangeDetectorRef,private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      state: [-1],
      type: [-1]
    });

    this.filterForm.valueChanges.subscribe(values => {
      this.getProcesses(this.page, this.size, values.state, values.type);
    });

    this.setStates();
    this.setTypes();
    this.getProcesses(1, 10);

  }

  ngOnInit(): void {
    this.setStates();
    this.setTypes();
    this.getProcesses(1, 10);
  }



  getProcesses(page: number, size: number, state?: number, type?: number): void {
    const params: any = { page, size };
    if (state !== undefined && state >= 0) {
      params.state = state;
    }
    if (type !== undefined && type >= 0) {
      params.type = type;
    }

    this.processService.listProcessType(params.page, params.size, params.state, params.type).subscribe(
      (data) => {
        this.processes = data;
        this.cdr.detectChanges();
      },
      (error) => {
        console.error('Error fetching processes', error);
      }
    );
  }


  setStates()
  {
    this.processStateTypeService.getAll().subscribe(
      (data) => {
        this.states = data;
      },
      (error) => {
        console.error('Error fetching process states', error);
      }
    )
  }

  setTypes()
  {
    this.processTypeService.listProcessTypes(1000,1).subscribe(
      (data) => {
        this.types = data;
      },
      (error) => {
        console.error('Error fetching process types', error);
      }
    );
  }

  setSize(size:number)
  {
    this.size = size;
    this.getProcesses(this.page, this.size);
  }

  next()
  {
    this.page++;
    this.getProcesses(this.page, this.size);

  }

  previous()
  {
    this.page--;
    this.getProcesses(this.page, this.size);

  }


}
