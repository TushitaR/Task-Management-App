import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, Subject, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http: HttpClient) { }
  taskAdded = new Subject<void>(); // Subject to emit events when a task is added

  addTask(taskForm: FormGroup): Observable<any> {
    if (taskForm.valid) {
      return this._http.post('http://localhost:3000/tasks', taskForm.value).pipe(
        tap(() => {
          this.taskAdded.next(); // Emit event when task is added successfully
        })
      );
    }
    return throwError('Form is invalid');
  }

  updateTask(id: string, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/tasks/${id}`, data);
  }

  getTaskList(): Observable<any> {
    return this._http.get('http://localhost:3000/tasks');
  }

  deleteTask(id: string): Observable<any> {
    return this._http.delete(`http://localhost:3000/tasks/${id}`);
  }

  getTask(taskId: string): Observable<any> {
    return this._http.get(`http://localhost:3000/tasks/${taskId}`);
  }
}
