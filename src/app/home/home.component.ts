import { Component, OnInit } from '@angular/core';
import { TodoService } from '../service/shared/todo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [TodoService]
})

export class HomeComponent implements OnInit {
  todoArr: any[];
  constructor(private toDoService: TodoService) { }

  ngOnInit() {
    this.toDoService.getToDoList().snapshotChanges()
    .subscribe(
       data => {
         this.todoArr = [];
         data.forEach( element =>{
           var x = element.payload.toJSON();
           x["$key"] = element.key;
           this.todoArr.push(x);
         })

         // sort todolist from unchecked to checked
         this.todoArr.sort((a,b) =>{
           return a.isChecked - b.isChecked;
         }
         )
       }
    )
  }
  
  onAdd(itemTitle){
    this.toDoService.addToDo(itemTitle.value);
    itemTitle.value = null;
  }

  alterCheck($key: string, isChecked){
    this.toDoService.checkUnCheckToDo($key,!isChecked);
  }

  delete($key: string){
    this.toDoService.removeToDo($key);
  }
  
   
}
