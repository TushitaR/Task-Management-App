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

  creationDateValidator(control: FormControl) {
    const creationDate = new Date(control.value);
    const currentDate = new Date();
    if (creationDate > currentDate) {
      return { futureDate: true };
    }
    return null;
  }

  dueDateValidator(control: FormControl) {
    const dueDate = new Date(control.value);
    const currentDate = new Date();
    if (dueDate < currentDate) {
      return { pastDate: true };
    }
    return null;
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
  }

  taskSubmit() {
    if (this.data && this.data.isUpdate) {
      this.apiService.updateTask(this.task.id, this.taskForm.value).subscribe(
        (response: any) => {
          this.toastr.success('Task updated successfully!!');
          this.dialog.closeAll();
          console.log('API Response:', response);
        },
        (error: any) => {
          // Handle error if necessary
        }
      );
    } else {
      this.submit();
    }
  }

  submit() {
    this.apiService.addTask(this.taskForm).subscribe(
      (response: any) => {
        this.toastr.success('Task added successfully!!');
        this.dialog.closeAll();
        console.log('API Response:', response);
      },
      (error: any) => {
        // Handle error if necessary
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
