import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-option-menu',
  templateUrl: './option-menu.component.html',
  styleUrls: ['./option-menu.component.css']
})
export class OptionMenuComponent implements OnInit {
  title = 'Beat Bop!'
  BackTracks = ['House 120', 'Electronic', 'Hip-Hop'];
  DrumKits = ['Electronic', 'Hip-Hop', 'Country'];
  routes = ['Play', 'test', 'test'];
  constructor() { }

  ngOnInit() {
  }

  backtrack_highlight()
  {
    //this.sounds[0].play();
    console.log("backtrack highlighted");
  }

}
