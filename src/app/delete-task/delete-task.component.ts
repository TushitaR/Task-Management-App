import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MatDialogModule,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';

interface DialogData {
  id: string;
}

@Component({
  selector: 'app-delete-task',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './delete-task.component.html',
  styleUrl: './delete-task.component.scss'
})
export class DeleteTaskComponent {

  constructor(private dialogRef: MatDialogRef<DeleteTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: string },
    private apiService: ApiService,
    private toastr: ToastrService) {
  }

  confirmDelete() {
    const id = this.data.id;
     this.apiService.deleteTask(id).subscribe(
      () => {
        // console.log('Task deleted successfully.');
        this.toastr.success('Task deleted successfully!!');
      },
      (error) => {
        console.error('Error deleting task:', error);
        // Handle error if necessary
      }
    );
    this.dialogRef.close(true); // Passing true as result to indicate successful deletion
  }
  
}
