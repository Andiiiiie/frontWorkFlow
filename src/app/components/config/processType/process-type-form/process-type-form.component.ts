import {Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {ProcessTypeService} from "../../../../services/processType.service";
import {ProcessType} from "../../../../models/processType";
import Swal from "sweetalert2";

@Component({
  selector: 'app-process-type-form',
  standalone: true,
    imports: [
        FormsModule,
        NgForOf,
        ReactiveFormsModule
    ],
  templateUrl: './process-type-form.component.html',
  styleUrl: './process-type-form.component.css'
})
export class ProcessTypeFormComponent implements OnInit{
  newProcessType: ProcessType = {} as ProcessType;

  constructor(private route: ActivatedRoute, private router: Router,private processTypeService:ProcessTypeService) {
  }

  ngOnInit(): void {
  }

  onSubmit()
  {
    this.processTypeService.createProcessType(this.newProcessType).subscribe({
      next: () => {
        Swal.fire({
          title: 'Success!',
          text: 'Process Type Added Successfully',
          icon: 'success'
        })
      },
      error: error => {
        Swal.fire({
          title: 'Error!',
          text: error.message,
          icon: 'error'
      })}
    } );
  }

  test()
  {
    alert('test');
  }

}
