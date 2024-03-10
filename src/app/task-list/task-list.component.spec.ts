import { TestBed, ComponentFixture } from '@angular/core/testing';
import { TaskListComponent } from './task-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { ApiService } from '../services/api.service';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { MatTableModule } from '@angular/material/table';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let mockApiService: jasmine.SpyObj<ApiService>;

  beforeEach(async () => {
    mockApiService = jasmine.createSpyObj('ApiService', ['getTaskList', 'deleteTask']);
    mockApiService.getTaskList.and.returnValue(of([])); // Mocking the getTaskList method to return an empty array

    await TestBed.configureTestingModule({
      declarations: [TaskListComponent],
      imports: [HttpClientTestingModule, ToastrModule.forRoot(), RouterTestingModule,
      MatTableModule],
      providers: [
        { provide: ApiService, useValue: mockApiService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

