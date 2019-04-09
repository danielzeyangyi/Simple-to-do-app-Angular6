import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todolist: AngularFireList<any>;
  constructor(private firebaseService: AngularFireDatabase) { }

  getToDoList(){
    this.todolist = this.firebaseService.list('titles');
    return this.todolist;
  }

  addToDo(title: string){
    this.todolist.push({
      title: title,
      isChecked: false
    })
  }

  checkUnCheckToDo($key: string, flag: boolean){
    this.todolist.update($key,{isChecked: flag});
  }

  removeToDo($key: string){
     this.todolist.remove($key);
  }
}
