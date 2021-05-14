import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.page.html',
  styleUrls: ['./update-task.page.scss'],
})
export class UpdateTaskPage implements OnInit {

  @Input() task;

  categories = [];
  categorySelectedCategory;
  taskObject = {}; // newTaskObj
  taskName; //itemName
  taskDate; //itemDueDate
  taskPriority; //itemPriority
  taskCategory; //itemCategory


  constructor(public modalCtlr: ModalController, public todoService: TodoService) { }

  ngOnInit() {
    this.categories.push('work');
    this.categories.push('personal');
    this.categories.push('home');

    this.taskName = this.task.value.taskName;
    this.taskDate = this.task.value.taskDate;
    this.taskPriority = this.task.value.taskPriority;
    this.categorySelectedCategory = this.task.value.taskCategory;
    console.log(this.task);
  }

  selectedCategory(index){
    this.categorySelectedCategory = this.categories[index];
    console.log(this.categorySelectedCategory);

  }

  async dismis(){
    await this.modalCtlr.dismiss();
  }

  async update(){
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    this.taskObject = ({itemName:this.taskName,
      itemDueDate:this.taskDate,
      itemPriority:this.taskPriority,
      itemCategory:this.taskCategory
    });

    const uid = this.task.key;

    await this.todoService.updateTask(uid, this.taskObject);
    this.dismis();
  }

}
