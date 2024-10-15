import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {ProcessType} from "../../../../models/process-type";
import {ProcessTypeService} from "../../../../services/process-type.service";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-process-type-info',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './process-type-info.component.html',
  styleUrl: './process-type-info.component.css'
})
export class ProcessTypeInfoComponent implements OnInit {
  processType: ProcessType= {} as ProcessType;

  constructor(private route: ActivatedRoute, private router: Router, private processTypeService:ProcessTypeService,private  cdr:ChangeDetectorRef) {
    this.route.paramMap.subscribe(params => {
      let id = params.get('id');
      if (id) {
        this.setProcessType(Number(id));
      }
    });
  }

  ngOnInit(): void {
  }


  setProcessType(id:number) {
    this.processTypeService.getProcessType(id).subscribe({
      next: processType => {
        this.processType = processType;
        this.cdr.detectChanges();
      },
      error: error => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Erreur lors du chargement de la configuration du type de processus'
        })
      }
    });
  }



}
