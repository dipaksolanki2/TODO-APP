import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private apiUrl = 'http://localhost:3000/todos';

  constructor(private http: HttpClient) {}

  getAllTodos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addTodo(todoText: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { text: todoText });
  }

  updateTodo(todoId: number, todoPayload: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${todoId}`, todoPayload);
  }

  deleteTodo(todoId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${todoId}`);
  }

}
