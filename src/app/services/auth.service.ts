import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {API_URL} from "../app.component";
import {Observable, throwError} from "rxjs";
import {Token} from "../models/token";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  // login(credentials: { email: string, password: string }): Observable<Token> {
  //   return this.http.post(`${API_URL}/auth/login`, credentials);
  // }
  login(login: string, password: string ): Observable<Token> {
    return this.http.post<Object>(`${API_URL}/auth/login?login=${login}&password=${password}`,[login,password]).pipe(
      map((response: any) => {
          if(response.status=== 'error')
          {
            throw new Error(response.message);
          }
        // Transformer la réponse pour correspondre à l'interface Token
        return {
          token: response.data.token,
          userId: response.data.userId,
          role: response.data.role
          // Ajoute d'autres propriétés si nécessaire
        } as Token;
      }
        )
    );
  }

  getUserRole(): string {
    return localStorage.getItem('role') || '';
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    // Efface le token stocké
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    // Logique de validation du token
    return !!token && !!userId;
  }

  getToken(): string | null {

    return localStorage.getItem('token');
  }

  getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  setToken(token: Token) {
    console.log('Token ito', token);
    localStorage.setItem('token', token.token);
    alert("token ato"+ localStorage.getItem('token'));
    localStorage.setItem('userId',token.userId);
    localStorage.setItem('role',token.role);
  }

  private handleError(error: any) {
    console.error('Erreur de l\'API :', error);
    return throwError(error);
  }


}
