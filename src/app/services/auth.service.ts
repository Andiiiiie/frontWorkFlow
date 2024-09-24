import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {API_URL} from "../app.component";
import {Observable} from "rxjs";
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
    return this.http.post<Object>(`${API_URL}/connexion?login=${login}&password=${password}`,{login,password}).pipe(
      map((response: any) => {
        // Transformer la réponse pour correspondre à l'interface Token
        return {
          token: response.token,
          login: response.login,
          userId: response.userId,
          // Ajoute d'autres propriétés si nécessaire
        } as Token;
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');// Efface le token stocké
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    // Logique de validation du token
    return !!token;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  setToken(token: Token) {
    localStorage.setItem('token', token.token);
    localStorage.setItem('userId',token.userId);
  }


}
