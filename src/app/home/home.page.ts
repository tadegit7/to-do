import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddNewTaskPage } from '../add-new-task/add-new-task.page';
import { TodoService } from '../todo.service';
import { UpdateTaskPage } from '../update-task/update-task.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  todoList = [];

today: number = Date.now();
  constructor(public modalCtrl: ModalController, public todoService: TodoService) {

  }

  async addTask(){
    const modal = await this.modalCtrl.create({
      component: AddNewTaskPage
    });

    modal.onDidDismiss().then(newTask => {
      this.getAllTask();

    });

    return await modal.present();
  }

  getAllTask(){
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    this.todoList = this.todoService.getAllTasks();
    console.log(this.todoService.getAllTasks());
  }

  delete(key){
    //this.todoList.splice(index,1);
    //console.log(key);
    this.todoService.deleteTask(key);
    this.getAllTask();
  }

  async update(selectedTask) {
    const modal = await this.modalCtrl.create({
      component: UpdateTaskPage,
      componentProps: { task: selectedTask }
    });

    modal.onDidDismiss().then(() => {
      this.getAllTask();
    });

    return await modal.present();
  }

}
