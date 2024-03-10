import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Import HttpClientTestingModule
import { AddTaskComponent } from './add-task.component';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { ToastrModule, ToastrService } from 'ngx-toastr'; // Import ToastrModule and ToastrService
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogRef } from '@angular/material/dialog';

describe('AddTaskComponent', () => {
  let component: AddTaskComponent;
  let fixture: ComponentFixture<AddTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule,
        ReactiveFormsModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatDialogModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot()],
        providers: [
          { provide: MAT_DIALOG_DATA, useValue: {} },
          { provide: MatDialogRef, useValue: {} },
          ToastrService, FormBuilder, ApiService 
        ]
    })
      .compileComponents();
    fixture = TestBed.createComponent(AddTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set dateCreated and dueDate to null initially', () => {
    expect(component.dateCreated.value).toBeNull();
    expect(component.dueDate.value).toBeNull();
  });  

  it('should validate taskName field as required', () => {
    const taskName: FormControl = component.taskForm.get('taskName') as FormControl;
    expect(taskName.valid).toBeFalsy();
    expect(taskName.errors?.['required']).toBeTruthy(); // Access 'required' using ['required']
  
    taskName.setValue('Test Task');
    expect(taskName.valid).toBeTruthy();
  });

  it('should validate taskDesc field as required', () => {
    const taskDesc = component.taskForm.get('taskDesc');
    expect(taskDesc?.valid).toBeFalsy();
    expect(taskDesc?.errors?.['required']).toBeTruthy();

    taskDesc?.setValue('Test Description');
    expect(taskDesc?.valid).toBeTruthy();
  });

  it('should validate dateCreated field', () => {
    const dateCreated = component.taskForm.get('dateCreated');
    expect(dateCreated?.valid).toBeFalsy();

    dateCreated?.setValue(new Date(Date.now() + 86400000));
    expect(dateCreated?.errors?.['futureDate']).toBeTruthy();

    dateCreated?.setValue(new Date(Date.now() - 86400000));
    expect(dateCreated?.errors?.['futureDate']).toBeFalsy();
  });

  it('should validate dueDate field', () => {
    const dueDate = component.taskForm.get('dueDate');
    expect(dueDate?.valid).toBeFalsy();

    dueDate?.setValue(new Date(Date.now() - 86400000));
    expect(dueDate?.errors?.['pastDate']).toBeTruthy();

    dueDate?.setValue(new Date(Date.now() + 86400000));
    expect(dueDate?.errors?.['pastDate']).toBeFalsy();
  });  

  it('should close the form when closeForm method is called', () => {
    const dialogSpy = spyOn(component.dialog, 'closeAll');
    component.closeForm();
    expect(dialogSpy).toHaveBeenCalled();
  });
});
