import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-mockup',
  templateUrl: './mockup.component.html',
  styleUrls: ['./mockup.component.sass']
})
export class MockupComponent implements OnInit {

  constructor() {
  }

  @Input('stepperData') stepperData: any;

  ngOnInit() {
  }

}
