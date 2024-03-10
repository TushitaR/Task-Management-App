import { Component, EventEmitter, NgModule, OnInit, Output } from '@angular/core';
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
  constructor(private toastr: ToastrService, private dialog: MatDialog, private router: Router, private apiService: ApiService) { }
  ngOnInit(): void {
    if(this.tasks) {
      console.log(this.tasks);
      this.getTasklist();
    }
  }

  navigateToTask(taskId: number): void {
    this.router.navigate(['/task', taskId]);
  }

  task: any;

  getTasklist() {
    this.apiService.getTaskList().subscribe(
      (data: any) => {
        this.tasks = data;
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
        this.getTasklist();
      }
    });
  }
  
  deleteTask(id:string) {
    const dialogRef = this.dialog.open(DeleteTaskComponent, {
      data: { id: id }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
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