import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MatDialogModule,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';

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
        this.toastr.success('Task deleted successfully!!');
      },
      (error) => {
        console.error('Error deleting task:', error);
      }
    );
    this.dialogRef.close(true); // Passing true as result to indicate successful deletion
  }
  
}
