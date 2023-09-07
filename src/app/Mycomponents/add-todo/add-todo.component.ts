import { Component,EventEmitter, OnInit,Output, Input } from '@angular/core';
import { Todo } from 'src/app/models/Todo';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TodosComponent } from '../todos/todos.component';



@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {
  title?: string;
  addTaskForm!: FormGroup
  formTitle = "formValidation";
  submitted = false;
  @Output()todoAdd: EventEmitter<Todo> = new EventEmitter();

  constructor(private formBuilder: FormBuilder, private todoComponent: TodosComponent){ }

  ngOnInit(): void{
    //validations

    this.addTaskForm = this.formBuilder.group({
      title:['',Validators.required],
    })
  }
  onSubmit(){
    this.submitted = true
    if(this.addTaskForm.invalid){
      return
    }
    let totalTodos:number = this.todoComponent.noOfTodos;
    let userId = this.todoComponent.user? this.todoComponent.user.id:0;
    console.log(userId);
    
    const todo:Todo = {
      id: totalTodos+1,
      userId: userId,
      title: this.title,
      completed: false
    }
    
    
    this.todoAdd.emit(todo)
  }
  
}
