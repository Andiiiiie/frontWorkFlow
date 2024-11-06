import {Component, OnInit} from '@angular/core';
import {NotificationService} from "../../../services/notification.service";
import {NgForOf, NgIf} from "@angular/common";
import {Subscription} from "rxjs";
import {AuthService} from "../../../services/auth.service";
import {Notification} from "../../../models/notification";
import {Router} from "@angular/router";
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
  notifications: Notification[] = [];
  private subscription: Subscription | null = null;
  constructor(private notificationService: NotificationService,private authService:AuthService,private router:Router) {}

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

  loadAllNotifications(): void {
    this.router.navigate(['/all-notifications']);
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.notificationService.disconnect();
  }
}
