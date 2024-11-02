import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    RouterLink,
    NgIf
  ],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent  implements OnInit {
  role: string |null=null;
  constructor(private authService: AuthService) {
    this.setRole();
  }
  ngOnInit() {
    this.setRole();
  }

  setRole()
  {
    this.role = this.authService.getUserRole();
  }
}
