import { Injectable, NgZone } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {API_URL} from "../app.component";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private eventSource: EventSource | null = null;
  private notificationsSubject = new Subject<any>();

  constructor(private zone: NgZone) {}

  // Méthode pour démarrer la connexion SSE avec un userId spécifique
  connect(userId: string): Observable<any> {
    // Si l'EventSource est déjà ouvert, le fermer pour éviter les connexions multiples
    if (this.eventSource) {
      this.eventSource.close();
    }

    // Créer la connexion SSE vers le back-end
    this.eventSource = new EventSource(`${API_URL}/notifications/sse/${userId}`);

    // Gestion des événements de message
    this.eventSource.onmessage = (event) => {
      this.zone.run(() => {
        this.notificationsSubject.next(JSON.parse(event.data));
      });
    };

    // Gestion des erreurs
    this.eventSource.onerror = (error) => {
      console.error('Erreur SSE :', error);
      this.eventSource?.close();
      this.eventSource = null;
    };

    return this.notificationsSubject.asObservable();
  }

  // Méthode pour se déconnecter de SSE
  disconnect() {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }
  }
}
