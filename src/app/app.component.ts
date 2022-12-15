import { Component } from '@angular/core';
import {Task} from './task/task';
import {transferArrayItem, CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {MatDialog} from "@angular/material/dialog";
import {TaskDialogComponent, TaskDialogResult} from "./task-dialog/task-dialog.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'kanban-fire';
  todo: Task[] = [
    { title: 'Buy milk', description: 'Go to the store and buy milk'},
    { title: 'Create a Kanban app', description: 'Using Firebase And angular create a Kanban app'}
  ];
  done: Task[] = [];
  inProgress: Task[] = [];

  constructor(private dialog:MatDialog) {
  }
  newTask():void{
    const dialogRef = this.dialog.open(TaskDialogComponent, {width: '270px', data: {task:{},},});
    dialogRef.afterClosed().subscribe((result: TaskDialogResult)=>this.todo.push(result.task));
  }
  editTask(list: string, task: Task): void{

  }
  drop(event: CdkDragDrop<Task[]>): void{
    if(event.previousContainer === event.container){
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      return;
    }
    if (!event.container.data || !event.previousContainer.data){
      return;
    }
    transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
  }
}
