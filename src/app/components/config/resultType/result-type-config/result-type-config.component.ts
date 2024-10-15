import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ResultType} from "../../../../models/result-type";
import {ResultTypeService} from "../../../../services/result-type.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SweetAlert2Module} from "@sweetalert2/ngx-sweetalert2";
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import Swal from "sweetalert2";

@Component({
  selector: 'app-result-type-config',
  standalone: true,
  imports: [SweetAlert2Module, FormsModule, NgForOf, NgIf],
  templateUrl: './result-type-config.component.html',
  styleUrl: './result-type-config.component.css'
})
export class ResultTypeConfigComponent implements OnInit{
  resultTypes: ResultType[] = [];
  newResultType: ResultType = {} as ResultType;
  modifyResultType: ResultType = {} as ResultType;
  constructor(private route: ActivatedRoute, private router: Router, private resultTypeService:ResultTypeService,private cdr:ChangeDetectorRef) {

  }

  ngOnInit(): void {
    this.setResultTypes()
  }

  setResultTypes(){
    this.resultTypeService.getAll().subscribe({
      next: resultTypes => {
        this.resultTypes = resultTypes;
        this.cdr.detectChanges();
      },
      error: error => {
        Swal.fire({
          title: 'Error!',
          text: error,
          icon: 'error'
        });
      }
    });
  }

  onSubmit()
  {
    this.resultTypeService.create(this.newResultType).subscribe({
      next: () => {
        Swal.fire({
          title: 'Success!',
          text: 'Result Type Added Successfully',
          icon: 'success'
        });
        this.setResultTypes();
      },
      error: error => {
        Swal.fire({
          title: 'Error!',
          text: error,
          icon: 'error'
        });
      }
    });
  }

  modify(id: number){
    this.resultTypeService.getById(id).subscribe({
      next: resultType => {
        this.modifyResultType = resultType;
        this.cdr.detectChanges();
        console.log(this.modifyResultType);

      },
      error: error => {
        Swal.fire({
          title: 'Error!',
          text: error,
          icon: 'error'
        });
      }
    });
  }

  onSubmitModify()
  {
    if(this.modifyResultType.id)
    {
      this.resultTypeService.update(this.modifyResultType).subscribe({
        next: () => {
          Swal.fire({
            title: 'Success!',
            text: 'Result Type Updated Successfully',
            icon: 'success'
          });
          this.setResultTypes();
          this.modifyResultType={} as ResultType;
        },
        error: error => {
          Swal.fire({
            title: 'Error!',
            text: error,
            icon: 'error'
          });
        }
      });
    }
  }

  onSubmitSave()
  {
    if(this.newResultType.name)
    {
      this.newResultType.state=1;
      this.resultTypeService.create(this.newResultType).subscribe({
        next: () => {
          Swal.fire({
            title: 'Success!',
            text: 'Result Type Added Successfully',
            icon: 'success'
          });
          this.setResultTypes();
          this.newResultType={} as ResultType;
        },
        error: error => {
          Swal.fire({
            title: 'Error!',
            text: error,
            icon: 'error'
          });
        }
      });
    }
  }


  delete(id: number) {
    this.resultTypeService.delete(id).subscribe({
      next: () => {
        Swal.fire({
          title: 'Success!',
          text: 'Result Type Deleted Successfully',
          icon: 'success'
        });
        this.setResultTypes();
      },
      error: error => {
        Swal.fire({
          title: 'Error!',
          text: error,
          icon: 'error'
        });
      }
    });
  }
}
