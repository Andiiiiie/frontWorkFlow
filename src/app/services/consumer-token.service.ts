import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {ConsumerToken} from "../models/consumer-token";
import {catchError, map} from "rxjs/operators";
import {API_URL} from "../app.component";

@Injectable({
  providedIn: 'root'
})
export class ConsumerTokenService {

  constructor(private http:HttpClient) { }

  createConsumerToken(item:ConsumerToken): Observable<ConsumerToken> {
    return this.http.post<any>(`${API_URL}/owner/token`, item).pipe(
      map(response => {
        if(response.status === 'error') {
          throw new Error(response.message);
        }
        return response.data as ConsumerToken;
      }),
      catchError(this.handleError)

    );
  }

  listTokens(id:number):Observable<ConsumerToken[]>
  {
    return this.http.get<any>(`${API_URL}/owner/token/${id}`).pipe(
      map(response => {
        if(response.status === 'error') {
          throw new Error(response.message);
        }
        return response.data as ConsumerToken[];
      }),
      catchError(this.handleError)
    );
  }

  deleteToken(id:string):Observable<ConsumerToken>
  {
    return this.http.delete<any>(`${API_URL}/owner/token/${id}`).pipe(
      map(response => {
        if(response.status === 'error') {
          throw new Error(response.message);
        }
        return response.data as ConsumerToken;
      }),
      catchError(this.handleError)
    );
  }


  private handleError(error: any) {
    console.error('Erreur de l\'API :', error);
    return throwError(error);
  }
}
