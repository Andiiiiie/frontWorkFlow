import { Injectable } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { BehaviorSubject } from 'rxjs';
import {API_URL} from "../app.component";
import {AuthService} from "./auth.service";
@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private stompClient: any;
  private notifications: string[] = [];
  private notificationSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  // public notifications$ = this.notificationSubject.asObservable();

  constructor(private authService: AuthService) {
    this.initializeWebSocketConnection();
  }

  // initializeWebSocketConnection() {
  //   const socket = new SockJS(`${API_URL}/ws`);
  //   socket.onopen = () => {
  //     console.log('SockJS connection opened');
  //   };
  //
  //
  //   this.stompClient = Stomp.over(socket);
  //   this.stompClient.connect({}, (frame: any) => {
  //     console.log('Connected: ' + frame);
  //   }, (error: any) => {
  //     console.error('STOMP error: ' + error);
  //     // Code pour tenter une reconnexion
  //   });
  //
  //   //
  //   // this.stompClient.connect({}, (frame: any) => {
  //   //   // console.log('Connected: ' + frame);
  //   //   // this.stompClient.subscribe('/topic/notifications', (message: any) => {
  //   //   //   this.addNotification(message.body);
  //   //   // });
  //   //   const userId:string|null=this.authService.getUserId();
  //   //   // console.log("User id: "+userId);
  //   //   if (userId) {
  //   //     console.log(`Subscribing to /user/${userId}/queue/notifications`);
  //   //     this.stompClient.subscribe(`/user/${userId}/queue/notifications`, (message: any) => {
  //   //       console.log('Notification received:', message.body);
  //   //       this.addNotification(message.body);
  //   //     });
  //   //   } else {
  //   //     console.error('User ID is null, cannot subscribe to notifications.');
  //   //   }
  //   // });
  //   socket.onerror = (error) => {
  //     console.error('SockJS error:', error);
  //   };
  //   socket.onclose = () => {
  //     console.log('SockJS connection closed');
  //   };
  // }
  // initializeWebSocketConnection() {
  //   const socket = new SockJS(`${API_URL}/ws`);
  //   this.stompClient = Stomp.over(socket);
  //
  //   // Assure-toi d'avoir les gestionnaires d'événements pour le socket
  //   socket.onopen = () => {
  //     console.log('SockJS connection opened');
  //   };
  //
  //   socket.onclose = () => {
  //     console.log('SockJS connection closed');
  //   };
  //
  //   socket.onerror = (error) => {
  //     console.error('SockJS error:', error);
  //   };
  //
  //   // Assure-toi d'avoir les gestionnaires d'événements pour le socket
  //   this.stompClient.webSocketFactory = socketFactory;
  //
  //   // Connexion STOMP
  //   this.stompClient.connect({}, (frame: any) => {
  //     console.log('Connected: ' + frame);
  //     const userId: string | null = this.authService.getUserId();
  //
  //     if (userId) {
  //       this.stompClient.subscribe(`/user/1/queue/notifications`, (message: any) => {
  //         this.addNotification(message.body);
  //       });
  //     } else {
  //       console.error('User ID is null or undefined');
  //     }
  //   }, (error: any) => {
  //     console.error('STOMP connection error:', error);
  //   });
  // }
  initializeWebSocketConnection() {
    const socketFactory = () => new SockJS(`${API_URL}/ws`);
    this.stompClient = Stomp.over(socketFactory);

    this.stompClient.webSocketFactory = socketFactory;

    this.stompClient.connect({}, (frame: any) => {
      if (frame) {
        console.log('Connected: ' + JSON.stringify(frame));
      } else {
        console.error('Connection frame is undefined');
      }
      const userId: string | null = this.authService.getUserId();

      if (userId) {
        console.log(`Subscribing to /user/${userId}/topic/notifications`);
        this.stompClient.subscribe(`/user/${userId}/topic/notifications`, (message: any) => {
          console.log('Notification received:', message.body);
          this.addNotification(message.body);
        });
      } else {
        console.error('User ID is null or undefined');
      }
    }, (error: any) => {
      console.error('STOMP connection error:', error);
    });
  }



  addNotification(notification: string) {
    this.notifications.push(notification); // Ajoute la nouvelle notification au tableau
    this.notificationSubject.next(this.notifications); // Émet le tableau mis à jour
  }

  sendMessage(message: string) {
    this.stompClient.send('/app/send-notification', {}, message);
  }

  getNotifications() {
    return this.notificationSubject.asObservable(); // Renvoie un observable des notifications
  }
}
