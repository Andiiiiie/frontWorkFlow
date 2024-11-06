import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Organism} from "../models/organism";
import {catchError, map} from "rxjs/operators";
import {API_URL} from "../app.component";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class OrganismService {

  constructor(private http:HttpClient) { }

  addOrganism(item:Organism): Observable<Organism> {
    return this.http.post<any>(`${API_URL}/admin/organism`, item).pipe(
      map(response => {
        if(response.status === 'error') {
          throw new Error(response.message);
        }
        return response.data as Organism;
      }),
      catchError(this.handleError)
    );
  }

  getOrganisms():Observable<Organism[]>
  {
    return this.http.get<any>(`${API_URL}/admin/organism`).pipe(
      map(response => {
        if(response.status === 'error') {
          throw new Error(response.message);
        }
        return response.data as Organism[];
      }),
      catchError(this.handleError)
    );
  }

  addOwnerToOrganism(organismId:number,user:User):Observable<User>
  {
    return this.http.post<any>(`${API_URL}/admin/organism/${organismId}/owner`, user).pipe(
      map(response => {
        if(response.status === 'error') {
          throw new Error(response.message);
        }
        return response.data as User;
      }),
      catchError(this.handleError)
    );
  }

  getOrganismByOwner(userId:string|null):Observable<Organism>
  {
    return this.http.get<any>(`${API_URL}/owner/organism/owner/${userId}`).pipe(
      map(response => {
        if(response.status === 'error') {
          throw new Error(response.message);
        }
        return response.data as Organism;
      }),
      catchError(this.handleError)
    );
  }

  getOrganismById(id:number):Observable<Organism>
  {
    return this.http.get<any>(`${API_URL}/admin/organism/${id}`).pipe(
      map(response => {
        if(response.status === 'error') {
          throw new Error(response.message);
        }
        return response.data as Organism;
      }),
      catchError(this.handleError)
    );
  }




  private handleError(error: any) {
    console.error('Erreur de l\'API :', error);
    return throwError(error);
  }
}
