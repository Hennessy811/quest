import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

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

  numberOfWinners = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  selected_numberOfWinners = 1;

  constructor(private _formBuilder: FormBuilder) {}

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
