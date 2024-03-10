import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskInfoComponent, TaskInfoModule } from './task-info.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiService } from '../services/api.service';
import { RouterTestingModule } from "@angular/router/testing";

describe('TaskInfoComponent', () => {
  let component: TaskInfoComponent;
  let fixture: ComponentFixture<TaskInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskInfoModule,
      HttpClientTestingModule,
    RouterTestingModule],
      providers: [ApiService]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
