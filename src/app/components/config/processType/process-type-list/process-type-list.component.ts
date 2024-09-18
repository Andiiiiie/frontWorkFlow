import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ProcessType} from "../../../../models/processType";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {ProcessTypeService} from "../../../../services/processType.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-process-type-list',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './process-type-list.component.html',
  styleUrl: './process-type-list.component.css'
})
export class ProcessTypeListComponent implements OnInit{
  processTypes: ProcessType[] = [];
  size: number = 1;
  page: number = 1;

  constructor(private route: ActivatedRoute, private router: Router, private processTypeService:ProcessTypeService,private  cdr:ChangeDetectorRef) {

  }


  setProcessTypes(){
    this.processTypeService.getProcessTypesByStateAndPagination("0",this.size,this.page).subscribe({
      next: processTypes => {
        this.processTypes = processTypes;
        this.cdr.detectChanges();
      }
    });
  }

  ngOnInit(): void {
    this.setProcessTypes();
  }

  test()
  {
    alert('test');
  }

  setSize(size:number)
  {
    this.size = size;
    this.setProcessTypes();
  }

  next()
  {
      this.page++;
      this.setProcessTypes();
  }

  previous()
  {
      this.page--;
      this.setProcessTypes();
  }

  finalize(id:string)
  {
    this.processTypeService.finalizeConfiguration(id).subscribe({
      next: processTypes => {
        this.setProcessTypes();
      }
    });
  }

}
