import { Routes } from '@angular/router';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskInfoComponent } from './task-info/task-info.component';

export const routes: Routes = [
    {
        path: '',
        component: TaskListComponent
    },
    {
        path: 'task/:id',
        component: TaskInfoComponent
    }
];
