import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http: HttpClient) { }
  addTask(taskForm: FormGroup): Observable<any> {
    if (taskForm.valid) {
      return this._http.post('http://localhost:3000/tasks', taskForm.value);
    }
    // Return an observable with an error if the form is invalid
    return new Observable(observer => {
      observer.error('Form is invalid');
    });
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
