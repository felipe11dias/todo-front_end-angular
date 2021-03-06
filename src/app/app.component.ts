import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Todo } from './todo';
import { TodoService } from './todo.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  todos: Todo[] = []
  form: FormGroup = new FormGroup({
    description: new FormControl('', [Validators.required, Validators.minLength(4)])
  })

  ngOnInit() {
    this.getAllTodos()
  }
  
  constructor(
    private service: TodoService
  ){}

  done(todo: Todo) {
    this.service.markAsDone(todo.id).subscribe({
      next: todoUpdated => {
        todo.done = todoUpdated.done
        todo.doneDate = todoUpdated.doneDate
      }
    })
  }

  getAllTodos() {
    this.service.getAllTodos().subscribe( allTodos => {
      this.todos = allTodos
    })
  }

  delete(todo: Todo) {
    this.service.delete(todo.id).subscribe({
      next: response => {
        this.getAllTodos()
      }
    })
  }

  submit() {
    const todo: Todo = {...this.form.value}
    this.service.save(todo).subscribe(
      savedTodo => {
        this.todos.push(savedTodo)
        this.form.reset()
      }
    )
  }
}
