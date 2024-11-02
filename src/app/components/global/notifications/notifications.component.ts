import {Component, OnInit} from '@angular/core';
import {NotificationService} from "../../../services/notification.service";
import {NgForOf, NgIf} from "@angular/common";
import {Subscription} from "rxjs";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './notifications.component.html',
  styleUrls:[ './notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  notifications: any[] = [];
  private subscription: Subscription | null = null;
  constructor(private notificationService: NotificationService,private authService:AuthService) {}

  ngOnInit(): void {
    const userId = this.authService.getUserId() ; // Remplacez par le userId de l'utilisateur authentifié
    if (typeof userId === "string") {
      this.subscription = this.notificationService.connect(userId).subscribe(
        (notification) => {
          this.notifications.push(notification);
        },
        (error) => console.error('Erreur de notification :', error)
      );
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.notificationService.disconnect();
  }
}
