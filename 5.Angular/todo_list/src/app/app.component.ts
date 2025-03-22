import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

export interface Todo{
  name: string;
  isCompleted: boolean;
}
@Component({
  selector: 'app-root',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'todo_list';
  todos: Todo[] = []; //todos array
  newTodo: string = '' //stores the user input

  saveTodo() {
    if (this.newTodo.trim()) { //if the input is not empty...
      let todo_Object: Todo = { //creates an object to contain the input
        name : this.newTodo,  //assigns the input value
        isCompleted : false  //new tasks are not completed
      }
      this.todos.push(todo_Object) //adds the new task object to the todos array
      this.newTodo = '' //clears the input field

    }
    else {
      alert('Please Enter Todo')
    }
  }

  done(id: number) { //here we find the todo by its index
    this.todos[id].isCompleted = !this.todos[id].isCompleted  //this toggles isCompleted, if false, it becomes true, and vice versa

  }

  remove(id: number) {
     this.todos = this.todos.filter((v,i)=>i !==id)
   }
}
