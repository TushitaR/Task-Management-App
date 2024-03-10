import { Component, NgModule, OnInit, Output } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AddTaskComponent } from '../add-task/add-task.component';
import { DeleteTaskComponent } from '../delete-task/delete-task.component';
import { Subscription } from 'rxjs';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  status: string;
  actions: string;
}

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'status', 'actions'];
  tasks: any[] = []; // Initialize tasks as an empty array
  dataSource = new MatTableDataSource<any>(this.tasks);
  id!:string;
  private taskAddedSubscription!: Subscription;
  constructor(private dialog: MatDialog, private router: Router, private apiService: ApiService) { }
  ngOnInit(): void {
    this.getTasklist(); // Call getTasklist() on component initialization
    // this.taskAddedSubscription = this.apiService.taskAdded.subscribe(() => {
    //   this.getTasklist(); // Refresh task list when a new task is added
    // });
  }

  ngOnDestroy(): void {
    this.taskAddedSubscription.unsubscribe(); // Unsubscribe from taskAdded event to prevent memory leaks
  }

  navigateToTask(taskId: number): void {
    this.router.navigate(['/task', taskId]);
  }

  task: any;

  getTasklist() {
    this.apiService.getTaskList().subscribe(
      (data: any) => {
        this.tasks = data;
        this.dataSource.data = this.tasks; // Update dataSource with new tasks data
        console.log('Tasks Data:', data);
      },
      (error: any) => {
        console.error('Error fetching tasks:', error);
      }
    );
  }

  updatetask(task: any) {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      data: { task, isUpdate: true }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getTasklist(); // Refresh task list after update
      }
    });
  }
  
  //takes the ID of the task to be deleted as input.
deleteTask(id: string) {
    // Opens dialog to confirm task deletion, passing the task ID as data to dialog.
    const dialogRef = this.dialog.open(DeleteTaskComponent, {
        data: { id: id }
    });

    // Subscribe to the afterClosed event of the dialog, which emits the result when the dialog is closed.
    dialogRef.afterClosed().subscribe(result => {
        // Check if the result is true, indicating that the user confirmed the deletion.
        if (result) {
            // If deletion is confirmed, refresh the task list to reflect the changes after deletion.
            this.getTasklist();
        }
    });
}

}

@NgModule({
  declarations: [TaskListComponent],
  imports: [MatTableModule,
    CommonModule,
    MatButtonModule,
    RouterModule,
    RouterLink,
    MatIconModule,
    RouterLinkActive,
  ],
  providers: [ApiService, ToastrService],
})

export class TaskListModule { }