import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';

describe('ApiService', () => {
  let service: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ ApiService ]
    });
    service = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });
 
  afterEach(() => {
    httpTestingController.verify();
  });

  it('should add a task', () => {
    const taskForm = new FormGroup({
      title: new FormControl('Task 1', Validators.required),
      description: new FormControl('Description 1')
    });

    service.addTask(taskForm).subscribe(data => {
      expect(data).toBeDefined();
    });

    const req = httpTestingController.expectOne('http://localhost:3000/tasks');
    expect(req.request.method).toBe('POST');
    req.flush({});
  });
  
  it('should update a task', () => {
    const updateObj = { title: 'Updated Task' };
    const taskId = '1';
    const updatedTask = { ...updateObj, id: taskId };

    service.updateTask(taskId, updateObj).subscribe(res => {
      expect(res).toEqual(updatedTask);
    });

    const req = httpTestingController.expectOne(`http://localhost:3000/tasks/${taskId}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updateObj);
    req.flush(updatedTask);
  });

  it('should get a list of tasks', () => {
    service.getTaskList().subscribe(response => {
      expect(response).toBeDefined();
    });

    const req = httpTestingController.expectOne('http://localhost:3000/tasks');
    expect(req.request.method).toBe('GET');
    req.flush([]); 
  });

  it('should delete a task', () => {
    const id = '1';

    service.deleteTask(id).subscribe(response => {
      expect(response).toBeDefined();
    });

    const req = httpTestingController.expectOne(`http://localhost:3000/tasks/${id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should get a task by ID', () => {
    const taskId = '1';

    service.getTask(taskId).subscribe(response => {
      expect(response).toBeDefined();
    });

    const req = httpTestingController.expectOne(`http://localhost:3000/tasks/${taskId}`);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });
});
