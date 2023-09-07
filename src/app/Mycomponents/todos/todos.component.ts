import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/Todo';
import { User } from 'src/app/models/User';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit{

  public todo?: Todo;
  public todosMaster: Todo[] = [];
  public todos: Todo[] = [];
  public noOfTodos: number = 0;
  public user: User;
  public users: User[] = [
    {
      id: 0,
      name: 'Root',
    },
    {
      id: 1,
      name: 'virat',
    },
    {
      id: 2,
      name: 'Darshan',
    },
    {
      id: 3,
      name: 'Shuaib',
    },
    {
      id: 4,
      name: 'Rajat',
    },
    {
      id: 5,
      name: 'Maahi',
    },
    {
      id: 6,
      name: 'Guest',
    },
    {
      id: 7,
      name: 'virat',
    },
    {
      id: 8,
      name: 'Darshan',
    },
    {
      id: 9,
      name: 'Shuaib',
    },
    {
      id: 10,
      name: 'Rajat',
    },
  ];
  constructor ( private todoService: TodoService) { 
    this.user = this.users[1];
  }

  ngOnInit(): void {
      this.todoService.getTodos().subscribe((data: Todo[])=> {
        this.todosMaster = data;
        this.setTodos(data);
      });
  }

  setTodos(data: Todo[]) {
    data.forEach((todo:Todo, index:number) => {
      todo.id = index+1;
      this.users.forEach((user)=> {
        if( user.id === todo.userId) {
          todo.userName = user.name;
          this.todos = data;
          this.noOfTodos = this.todos.length;
        }
      });
    });
  }
  
  addTodo(data:Todo) {
    this.todos.push(data);
    this.todosMaster.push(data);
    this.setTodos(this.todos);
  }

  searchFromTitle(string: string) {
    if(string && string != '' && string != null ) {
      let allTodos = this.todosMaster;
      let todos = allTodos.filter((todo)=> todo.title?.includes(string));
      this.todos= todos;
      this.setTodos(this.todos);
    } else {
      this.todos = this.todosMaster;
      this.setTodos(this.todos)
    }
  }

  userChange(id:number) {
    let user = this.users.find((user)=> user.id == id);
    if(user) {
      this.user = user;
    }
    if(id == 0) {
      return this.setTodos(this.todosMaster);
    }
    const userTodos = this.todosMaster.filter((todo)=> {
      return todo.userId === id;
    });
    this.setTodos(userTodos);
  }

  afterKeyword(evt: string) {

  }

  toggleTodoCompletion(todo: Todo) {
    let todoToToggle = this.todos.find((t)=> t == todo)
    if(todoToToggle) {
      todoToToggle.completed? false:true;
    }
  }

  onDeleteButtonClick(todoId: number) {
    let todoToDelete = this.todos.find((todo)=> {
      return todo.id == todoId;
    });
    if(todoToDelete) {
      const index = this.todos.indexOf(todoToDelete);
      if(index>-1) {
        this.todos.splice(index,1);
        this.setTodos(this.todos);
      }
    }
  }
}
