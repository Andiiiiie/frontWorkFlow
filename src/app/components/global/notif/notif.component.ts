import {Component, OnInit} from '@angular/core';
import {WebSocketService} from "../../../services/web-socket.service";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-notif',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './notif.component.html',
  styleUrl: './notif.component.css'
})
export class NotifComponent implements OnInit{
  notifications:string[]=[]
  constructor(private webSocketService:WebSocketService) {
    this.setNotifications();
  }

  ngOnInit() {
    this.setNotifications();
  }

  setNotifications(){
    this.webSocketService.getNotifications().subscribe(
        (notifications:string[])=>{
          this.notifications=notifications;
        }
    );
  }
}
