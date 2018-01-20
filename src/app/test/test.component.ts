import { Component, OnInit } from '@angular/core';
//node_modules/tracking/build/tracking.js    
import 'tracking/build/tracking';
//node_modules/tracking/build/data/face.js
import 'tracking/build/data/face';

//Declare this variables so they are visible in your code
declare var window: any;
declare var tracking: any;

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  window:any; 
  tracking:any;

  constructor() {
    
  }

  ngOnInit() {

  }

}
