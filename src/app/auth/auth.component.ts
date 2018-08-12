import { Component, OnInit } from '@angular/core';
import {NgbCarouselConfig} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.less']
})
export class AuthComponent implements OnInit {

  images: Array<any> = [
    'assets/images/slide_1.png',
    'assets/images/slide_2.png',
    'assets/images/slide_3.png',
    'assets/images/slide_4.png',
  ];



  constructor(config: NgbCarouselConfig) {
    config.interval = 100000000;
    config.wrap = true;
    config.keyboard = true;
    config.pauseOnHover = true;
    config.showNavigationArrows = false;
    config.showNavigationIndicators = false;
  }

  ngOnInit() {
  }

}
