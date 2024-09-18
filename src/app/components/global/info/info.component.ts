import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import Swal from 'sweetalert2';
import {SweetAlert2Module, SwalDirective } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [SweetAlert2Module],
  templateUrl: './info.component.html',
  styleUrl: './info.component.css'
})
export class InfoComponent  implements OnInit{
  id: string | null = null;

  constructor(private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

  }

  test()
  {
    Swal.fire({
      title: 'Error!',
      text: 'Do you want to continue',
      icon: 'error',
      confirmButtonText: 'Cool'
    });
  }


}
