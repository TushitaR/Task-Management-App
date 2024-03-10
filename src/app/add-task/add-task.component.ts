import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ErrorStateMatcher, provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, CommonModule, FormsModule, ReactiveFormsModule,
    MatDatepickerModule, MatButtonModule],
  providers: [provideNativeDateAdapter(), ApiService, ToastrService],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent implements OnInit {
  taskForm!: FormGroup;
  taskName!: FormControl;
  taskDesc!: FormControl;
  status!: FormControl;
  dateCreated: FormControl = new FormControl(null);
  dueDate: FormControl = new FormControl(null);
  task: any;
  constructor(
    private _fb: FormBuilder,
    private apiService: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<AddTaskComponent>,
    public dialog: MatDialog
  ) {
    const currentDate = new Date().toISOString();
    this.taskForm = this._fb.group({
      taskName: ['', [Validators.required]],
      status: ['', [Validators.required]],
      taskDesc: ['', [Validators.required]],
      dateCreated: [null, [Validators.required, this.creationDateValidator]],
      dueDate: [null, [Validators.required, this.dueDateValidator]]
    });
  }

  // Validator for ensuring the task creation date is not in the future
creationDateValidator(control: FormControl) {
  const creationDate = new Date(control.value); // Extract creation date from FormControl
  const currentDate = new Date(); // Get current date
  
  // Return validation error if creation date is in the future, otherwise return null
  return creationDate > currentDate ? { futureDate: true } : null;
}

// Validator for ensuring the task due date is not in the past
dueDateValidator(control: FormControl) {
  const dueDate = new Date(control.value); // Extract due date from FormControl
  const currentDate = new Date(); // Get current date
  
  // Return validation error if due date is in the past, otherwise return null
  return dueDate < currentDate ? { pastDate: true } : null;
}

  ngOnInit() {
    if (this.data && this.data.task) {
      this.task = this.data.task;
      this.taskForm.patchValue({
        taskName: this.task.taskName,
        status: this.task.status,
        taskDesc: this.task.taskDesc,
        dateCreated: this.task.dateCreated,
        dueDate: this.task.dueDate
      });
    }
    this.taskSubmit();
  }

  taskSubmit() {
    if (this.data && this.data.isUpdate) {
      this.apiService.updateTask(this.task.id, this.taskForm.value).subscribe(
        (response: any) => {
          this.toastr.success('Task updated successfully!!');
          this.dialogRef.close(true); // Pass true to indicate successful update
          console.log('API Response:', response);
        },
        (error: any) => {
          console.error('Error updating task:', error);
        }
      );
    } else {
      this.submit(); // Call submit function for adding a new task
    }
  }  

  submit() {
    this.apiService.addTask(this.taskForm).subscribe(
      (response: any) => {
        this.toastr.success('Task added successfully!!');
        this.dialogRef.close(true);
        window.location.reload();
        console.log('API Response:', response);
      },
      (error: any) => {
        console.error('Error adding task:', error); // Log any errors that occur during task addition
      }
    );
  }

  closeForm() {
    this.dialog.closeAll();
  }
  getTaskNameErrorMessage() {
    const taskNameControl = this.taskForm.get('taskName');

    if (taskNameControl && taskNameControl.invalid) {
      return 'Task name is required';
    }
    return '';
  }

  getTaskDescErrorMessage() {
    const taskDescControl = this.taskForm.get('taskDesc');
    if (taskDescControl && taskDescControl.invalid) {
      return 'Task Description is required';
    }
    return '';
  }

  selected = new FormControl('valid', [Validators.required, Validators.pattern('valid')]);

  selectFormControl = new FormControl('valid', [Validators.required, Validators.pattern('valid')]);

  nativeSelectFormControl = new FormControl('valid', [
    Validators.required,
    Validators.pattern('valid'),
  ]);

  matcher = new MyErrorStateMatcher();
}
