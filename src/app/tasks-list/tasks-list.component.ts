import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

const BACKEND_URL = environment.apiUrl;

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.sass']
})
export class TasksListComponent implements OnInit {

  isLoading = false;
  isListedDisplayMode = false;
  tasksList: any;
  tasksCount: number;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.isLoading = true;
    this.http.get(BACKEND_URL + '/quests')
      .subscribe(result => {
          console.log(result);
          this.tasksList = result;
          this.tasksCount = this.tasksList.length;
          this.isLoading = false;
        },
        error2 => {
        this.isLoading = false;
          console.log(error2);
        });
  }
}
