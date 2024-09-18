import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ResultTypeService} from "../../../../services/resultType.service";
import {ResultType} from "../../../../models/resultType";
import {SweetAlert2Module} from "@sweetalert2/ngx-sweetalert2";
import Swal from "sweetalert2";
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-result-type-config',
  standalone: true,
  imports: [SweetAlert2Module, FormsModule, NgForOf],
  templateUrl: './result-type-config.component.html',
  styleUrl: './result-type-config.component.css'
})
export class ResultTypeConfigComponent implements OnInit{
  resultTypes: ResultType[] = [];
  newResultType: ResultType = {} as ResultType;
  constructor(private route: ActivatedRoute, private router: Router, private resultTypeService:ResultTypeService) {

  }

  ngOnInit(): void {
      this.setResultTypes();
  }


  setResultTypes(){
    this.resultTypeService.getResultTypes().subscribe({
      next: resultTypes => {
        this.resultTypes = resultTypes;
      }
    });
  }

  onSubmit()
  {
    console.log(this.newResultType);
    this.resultTypeService.createResultType(this.newResultType).subscribe({
      next: () => {
        Swal.fire({
          title: 'Success!',
          text: 'Result Type Added Successfully',
          icon: 'success'
        })
        this.setResultTypes();
      }
    });
  }

  test()
  {
    alert('test');
  }

}
