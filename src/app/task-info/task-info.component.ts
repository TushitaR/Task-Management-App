import { HttpClient } from '@angular/common/http';
import { Component, NgModule, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-info',
  templateUrl: './task-info.component.html',
  styleUrl: './task-info.component.scss'
})
export class TaskInfoComponent implements OnInit {
  taskId!: string;
  task: any;
  isLoading: boolean = false;
  isError: boolean = false;
  constructor(private apiService: ApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.taskId = params['id'];
      this.getTaskDetails(this.taskId);
    });
  }

  getTaskDetails(taskId: string): void {
    this.isLoading = true;
    this.apiService.getTask(taskId).subscribe(
      (data: any) => {
        this.task = data;
        this.isLoading = false;
      },
      (error: any) => {
        console.error('Error fetching task details:', error);
        this.isError = true;
        this.isLoading = false;
      }
    );
  }
  tasks:any;
}


@NgModule({
  declarations: [TaskInfoComponent],
  imports: [MatCardModule, CommonModule],
  providers: [ApiService],
})

export class TaskInfoModule { }