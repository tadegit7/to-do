import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-add-new-task',
  templateUrl: './add-new-task.page.html',
  styleUrls: ['./add-new-task.page.scss'],
})
export class AddNewTaskPage implements OnInit {
  categories = ['work', 'personal', 'home'];
  categorySelectedCategory;
  taskName;
  taskDate;
  taskPriority;
  taskCategory;

  taskObject = {};
  constructor(public modalCtrl: ModalController, public todoService: TodoService) { }

  ngOnInit() {
  }

  async dismis(){
    await this.modalCtrl.dismiss(this.taskObject);
  }

  selectedCategory(index){
    this.categorySelectedCategory = this.categories[index];
    console.log(this.categorySelectedCategory);

  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  async AddTask(){
    this.taskObject = ({itemName:this.taskName,
                        itemDueDate:this.taskDate,
                        itemPriority:this.taskPriority,
                        itemCategory:this.taskCategory
                      });
    console.log(this.taskObject);
    const uid = this.taskName + this.taskDate; //taskName : itemName, taskDate: itemDueDate, taskObject: newTaskObj

    if(uid) {// uid: user ID
    await this.todoService.addTask(uid, this.taskObject);
    } else{
      console.log('cant save empty task');
    }
    this.dismis();

  }
}
