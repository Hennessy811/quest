import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CreateQuestModel} from './create-quest.model';

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
    author: 'Просто Ваня',
    title: 'Title',
    description: 'Условием участия в конкурсе является подписка\n' +
    '            на канал и лайк к видео. Из тех, кто выполнит\n' +
    '            условия конкурса случайным образом будет\n' +
    '            выбран победитель, который получит приз.',
    prize: 'kek',
    number_of_winners: 1,
    winner: undefined
  };
  numberOfWinners = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  selected_numberOfWinners = 1;

  constructor(private _formBuilder: FormBuilder) {
  }

  getChannelImg() {
    this.stepperData.channelLink = this.firstFormGroup.value.linkToAuthor;
    // todo change header image
    // todo change author image and name
  }

  getPostLink() {
    this.stepperData.postLink = this.firstFormGroup.value.linkToTask;
  }

  createQuest() {
    console.log(this.firstFormGroup.value);
    console.log(this.secondFormGroup.value);
    console.log(this.thirdFormGroup.value);
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      linkToAuthor: [''], //, Validators.required
      linkToTask: [''] //, Validators.required
    });
    this.secondFormGroup = this._formBuilder.group({
      headerName: [''], //, Validators.required
      description: [''], //, Validators.required
      addlabel: ['']
    });
    this.thirdFormGroup = this._formBuilder.group({
      enterPrizeName: [''], //, Validators.required
      numberOfWinners: ['']
    });
  }
}
