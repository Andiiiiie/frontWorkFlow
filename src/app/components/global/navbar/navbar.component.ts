import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {NotificationsComponent} from "../notifications/notifications.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    NgIf,
    NotificationsComponent
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  role:string | null = null;

  constructor(private authService: AuthService, private router: Router) {
    this.role = this.authService.getUserRole();
  }

  ngOnInit(): void {
    this.role = this.authService.getUserRole();
  }

  logout()
  {
    this.authService.logout();
    this.router.navigate(['/login']);
  }



  test()
  {
    alert('test');
  }

}
