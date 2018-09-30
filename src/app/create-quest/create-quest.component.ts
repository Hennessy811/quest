import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CreateQuestModel} from './create-quest.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {AuthService} from '../auth/auth-service';
import {Router} from '@angular/router';

const BACKEND_URL = environment.apiUrl;

@Component({
  selector: 'app-create-quest',
  templateUrl: './create-quest.component.html',
  styleUrls: ['./create-quest.component.sass']
})
export class CreateQuestComponent implements OnInit {
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  stepperData: CreateQuestModel = {
    channelLink: undefined,
    headerImgUrl: 'src/assets/images/mockup_header.png',
    postLink: undefined,
    author: 'Блог Дяди Вани',
    title: 'Битва за Бэнтли',
    description: 'Условием участия в конкурсе является подписка\n' +
    '            на канал и лайк к видео. Из тех, кто выполнит\n' +
    '            условия конкурса случайным образом будет\n' +
    '            выбран победитель, который получит приз.',
    prize: 'Бэнтли',
    number_of_winners: 1,
    winner: undefined
  };
  numberOfWinners = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  selected_numberOfWinners = 1;

  constructor(
    private _formBuilder: FormBuilder,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router) {
  }

  getChannelImg() {
    this.stepperData.channelLink = this.firstFormGroup.value.linkToAuthor;
    // todo change header image
    // todo change author image and name
  }

  getPostLink() {
    this.stepperData.postLink = this.firstFormGroup.value.linkToTask;
  }

  setTitleDescr() {
    this.stepperData.title = this.secondFormGroup.value.headerName;
    this.stepperData.description = this.secondFormGroup.value.description;
  }

  setPrizeName() {
    this.stepperData.prize = this.thirdFormGroup.value.enterPrizeName;
  }

  createQuest() {
    const token = this.authService.getToken();
    this.http.post<any>(
      BACKEND_URL + '/quests',
      `access_token=${token}&linkToAuthor=${this.firstFormGroup.value.linkToAuthor}
      &linkToTask=${this.firstFormGroup.value.linkToTask}
      &headerName=${this.secondFormGroup.value.headerName}
      &description=${this.secondFormGroup.value.description}
      &addLabel=${this.firstFormGroup.value.addlabel}
      &enterPrizeName=${this.thirdFormGroup.value.enterPrizeName}
      &numberOfWinners=${this.thirdFormGroup.value.numberOfWinners}`
    ).subscribe(
      response => {
        this.router.navigate(['/tasks-list']);
        // console.log(response);
      },
      error2 => {
        console.log(error2);
      }
    );
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      linkToAuthor: ['', Validators.required], // Validators.required
      linkToTask: ['', Validators.required] // Validators.required
    });
    this.secondFormGroup = this._formBuilder.group({
      headerName: ['', Validators.required], // Validators.required
      description: ['', Validators.required], // Validators.required
      addlabel: ['']
    });
    this.thirdFormGroup = this._formBuilder.group({
      enterPrizeName: ['', Validators.required], // Validators.required
      numberOfWinners: ['', Validators.required]
    });
  }
}
