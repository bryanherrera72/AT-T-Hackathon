import { Component, OnInit } from '@angular/core';
import {Howl, Howler} from 'howler';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
  
})
export class MainMenuComponent implements OnInit {
  title = 'Beat Bop';
  menuItems = ['Play', 'Create Song','User Settings'];
  routes = ['Options', 'Play', 'test'];
  sounds:Howl[];
  constructor() { }

  buttonplay()
  {
    this.sounds[0].play();
    console.log("played audio from button");
  }

  ngOnInit() {
    this.sounds = [new Howl({src:'../assets/audio/Famoush.wav'})];
  }
}
