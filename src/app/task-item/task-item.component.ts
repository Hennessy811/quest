import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {AuthService} from '../auth/auth-service';

const BACKEND_URL = environment.apiUrl;

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.sass']
})
export class TaskItemComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private http: HttpClient,
              private authService: AuthService) {
  }

  itemId: string;
  stepperData: any;
  isLoading = false;

  checkTask() {
    // console.log(localStorage.getItem('token'));
  }

  ngOnInit() {
    this.isLoading = true;
    this.route.params
      .subscribe(payload => {
        this.itemId = payload.id;
      });
    this.http.get(BACKEND_URL + '/quests/' + this.itemId)
      .subscribe(response => {
          this.stepperData = response;
          this.isLoading = false;
        },
        error2 => {
          console.log(error2);
          this.isLoading = false;
        });
  }

}
