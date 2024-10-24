import {Component, OnInit} from '@angular/core';
import {WebSocketService} from "../../../services/web-socket.service";
import {NgForOf, NgIf} from "@angular/common";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  notifications: string[]= [];
  info:string|null="";

  constructor(private webSocketService: WebSocketService,private authService:AuthService) {}

  ngOnInit(): void {
    this.info=this.authService.getToken();
    this.webSocketService.getNotifications().subscribe((notifications:string[]) => {
      this.notifications=notifications;
    });
  }
}
