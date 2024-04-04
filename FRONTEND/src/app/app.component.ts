import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { TodoService } from './services/todo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  todoForm: FormGroup;
  todos: any[] = [];
  filterOption: 'all' | 'completed' | 'active' = 'all';
  editingTodo: any = null;

  constructor(private fb: FormBuilder, private todoService: TodoService) {
    this.todoForm = this.fb.group({
      todoText: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadTodos();
  }

  addTodo() {
    if (this.todoForm.valid) {
      const todoText = this.todoForm.value.todoText;
      if (this.editingTodo) {
        // If editing, update the existing todo
        this.todoService.updateTodo(this.editingTodo._id, { text: todoText, completed: this.editingTodo.completed }).subscribe(updatedTodo => {
          const index = this.todos.findIndex(todo => todo._id === updatedTodo._id);
          if (index !== -1) {
            this.todos[index] = updatedTodo;
          }
          this.editingTodo = null; // Reset editing state
          this.todoForm.reset();
          this.saveTodosToLocalStorage()
        });
      } else {
        // If not editing, add a new todo
        this.todoService.addTodo(todoText).subscribe(newTodo => {
          this.todos.push(newTodo);
          this.todoForm.reset();
          this.saveTodosToLocalStorage()
        });
      }
    }
  }

  toggleCompleted(todo: any) {
    todo.completed = !todo.completed;
    this.todoService
      .updateTodo(todo._id, { text: todo.text, completed: todo.completed })
      .subscribe((updatedTodo) => {
        const index = this.todos.findIndex((t) => t._id === updatedTodo._id);
        if (index !== -1) {
          this.todos[index] = updatedTodo;
        }
        this.saveTodosToLocalStorage();
      });
    this.loadTodos();
  }

  deleteTodo(todoId: any) {
    this.todoService.deleteTodo(todoId).subscribe(() => {
      this.todos = this.todos.filter(todo => todo._id !== todoId);
      this.saveTodosToLocalStorage(); // Update local storage
    });
    this.loadTodos();
  }

  saveTodosToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  editTodo(todo: any) {
    this.editingTodo = todo;
    this.todoForm.patchValue({ todoText: todo.text });
  }

  cancelEdit() {
    this.editingTodo = null;
    this.todoForm.reset();
  }

  filterTodos(option: 'all' | 'completed' | 'active') {
    this.filterOption = option;
  }

  getFilteredTodos() {
    if (this.filterOption === 'completed') {
      return this.todos.filter(todo => todo.completed);
    } else if (this.filterOption === 'active') {
      return this.todos.filter(todo => !todo.completed);
    } else {
      return this.todos;
    }
  }

  getCompletedCount() {
    return this.todos.filter(todo => todo.completed).length;
  }

  loadTodos() {
    this.todoService.getAllTodos().subscribe(todos => {
      this.todos = todos;
    });
  }
}
