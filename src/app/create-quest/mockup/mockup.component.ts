import {Component, Input, OnChanges, SimpleChange} from '@angular/core';

@Component({
  selector: 'app-mockup',
  templateUrl: './mockup.component.html',
  styleUrls: ['./mockup.component.sass']
})
export class MockupComponent {

  constructor() {
  }

  @Input() stepperData: any;
}
