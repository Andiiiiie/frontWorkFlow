import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {ProcessType} from "../../../../models/processType";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {ProcessTypeService} from "../../../../services/processType.service";

@Component({
  selector: 'app-process-type-valid-list',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    RouterLink
  ],
  templateUrl: './process-type-valid-list.component.html',
  styleUrl: './process-type-valid-list.component.css'
})
export class ProcessTypeValidListComponent implements OnInit{
  processTypes: ProcessType[] = [];
  size: number = 1;
  page: number = 1;

  constructor(private route: ActivatedRoute, private router: Router, private processTypeService:ProcessTypeService,private  cdr:ChangeDetectorRef) {

  }


  setProcessTypes(){
    this.processTypeService.getProcessTypesByStateAndPagination("1",this.size,this.page).subscribe({
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
}
