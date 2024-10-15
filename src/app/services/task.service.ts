import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {Task} from "../models/task";
import {API_URL} from "../app.component";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http:HttpClient) { }

  getTasksByStep(id:number) : Observable<Task[]>{
    return this.http.get<any>(`${API_URL}/tasks/step/${id}`).pipe(
      map(response => {
        if(response.status === 'error') {
          throw new Error(response.message);
        }
        return response.data as Task[];
      }),
      catchError(this.handleError)
    );

  }

  createTask(item: Task): Observable<Task> {
    return this.http.post<any>(`${API_URL}/tasks`, item).pipe(
      map(response => {
        if(response.status === 'error') {
          throw new Error(response.message);
        }
        return response.data as Task;
      }),
      catchError(this.handleError)

    );
  }

  updateTask(item: Task): Observable<Task> {
    return this.http.put<any>(`${API_URL}/tasks`, item).pipe(
      map(response => {
        if(response.status === 'error') {
          throw new Error(response.message);
        }
        return response.data as Task;
      }),
      catchError(this.handleError)

    );
  }

  deleteTask(id: number): Observable<Task> {
    return this.http.delete<any>(`${API_URL}/${id}`).pipe(
      map(response => {
        if(response.status === 'error') {
          throw new Error(response.message);
        }
        return response.data as Task;
      }),
      catchError(this.handleError)

    );
  }

  getTaskById(id:number):Observable<Task>
  {
    return this.http.get<any>(`${API_URL}/tasks/${id}`).pipe(
      map(response=>{
        if(response.status === 'error') {
          throw new Error(response.message);
        }
        return response.data as Task;
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('Erreur de l\'API :', error);
    return throwError(error);
  }
}
