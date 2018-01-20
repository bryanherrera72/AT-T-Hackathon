import { Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
// node_modules/tracking/build/tracking.js
import 'tracking/build/tracking';
import 'tracking';
// node_modules/tracking/build/data/face.js
import 'tracking/build/data/face';

interface Navigator {
  getUserMedia(
      options: { video?: boolean; audio?: boolean; },
      success: (stream: any) => void,
      error?: (error: string) => void
      ): void;
}

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements AfterViewInit {
  window: any;
  tracking: any;

  @ViewChild('myVideo') hardwareVideo;

  constructor() {}
  startVideo() {
    const video = this.hardwareVideo.nativeElement;

    var n = <any>navigator;

    n.getUserMedia = ( n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia  || n.msGetUserMedia );
    n.mediaDevices.getUserMedia({ video: true }).then(
        (stream) => {
      console.log("called");
        video.src = window.URL.createObjectURL(stream);
        video.play();
    },
        (err) => {
          console.log(err);
        });
    var colors = new tracking.ColorTracker(['magenta', 'cyan', 'yellow']);
    colors.on('track', function(event) {
      if (event.data.length === 0) {
        // No colors were detected in this frame.
      } else {
        event.data.forEach(function(rect) {
          console.log(rect.x, rect.y, rect.height, rect.width, rect.color);
          //emit some kind of event here.
        });
      }
    });

    tracking.track('#myVideo', colors);
  }

  ngAfterViewInit() {
      this.startVideo();
  }

}
