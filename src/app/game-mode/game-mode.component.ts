import { Component, OnInit, ViewChild, AfterViewInit, Renderer2, ElementRef } from '@angular/core';
// node_modules/tracking/build/tracking.js
import 'tracking/build/tracking';
import 'tracking';
// node_modules/tracking/build/data/face.js
import 'tracking/build/data/face';
<<<<<<< HEAD
import {AnimateHitObjectDirective} from './animate-hit-object.directive';
import {Subject} from 'rxjs/Subject';
=======
import {Subject} from 'rxjs/Subject';

import {Howl, Howler} from 'howler';
>>>>>>> 4b303f1d4fe4b49a8499621b35cde4dbfec62764

interface Navigator {
    getUserMedia(
        options: { video?: boolean; audio?: boolean; },
        success: (stream: any) => void,
        error?: (error: string) => void
    ): void;
}

@Component({
    selector: 'app-game-mode',
    templateUrl: './game-mode.component.html',
    styleUrls: ['./game-mode.component.css']
})
export class GameModeComponent implements AfterViewInit {
    window: any;
    tracking: any;
    cdnEndpoint = 'http://d33k0w5tn3c49w.cloudfront.net/'
    hitBoxImage = 'http://www.freeiconspng.com/uploads/circle-png-7.png';
    hitBoxImages = ['CircleTeal.png', 'CircleRed.png', 'CircleGreen.png'];
    // This tracks the user's movement
    userCursorX = 0;
    userCursorXSubject = new Subject();

    cursorXCoordinateSubject = new Subject();
    cursorYCoordinateSubject = new Subject();

    sounds:Howl[];
    @ViewChild('myVideo') hardwareVideo;
    // @ViewChild('');

<<<<<<< HEAD
    constructor(private renderer: Renderer2,
                private elemRef: ElementRef) {}
    startVideo(xCoordinate) {
=======
    constructor() {}
    startVideo(xCoordinateSubject, yCoordinateSubject) {


>>>>>>> 4b303f1d4fe4b49a8499621b35cde4dbfec62764
        const video = this.hardwareVideo.nativeElement;

        var n = <any>navigator;

        n.getUserMedia = ( n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia  || n.msGetUserMedia );
        n.mediaDevices.getUserMedia({ video: true }).then(
            (stream) => {
                // console.log("called");
                video.src = window.URL.createObjectURL(stream);
                video.play();
            },
            (err) => {
                console.log(err);
            });

        // Custom color tracking for RGB(60, 0, 160) (+/- 50 for error)
        tracking.ColorTracker.registerColor('purple', function(r, g, b) {
            if (r >= 10 && r <= 110  && g <= 50 && b >= 110 && b <= 210) {
                return true;
            }
            return false;
            });

        // Change the minimum dimension for color tracking to 1
        tracking.ColorTracker.prototype.minDimension = 1;

        var colors = new tracking.ColorTracker(['purple']);
        colors.on('track', function(event) {
            if (event.data.length === 0) {
                // No colors were detected in this frame.
            } else {
<<<<<<< HEAD
                event.data.forEach((rect) => {
                    console.log(rect.x, rect.y, rect.height, rect.width, rect.color);
                    xCoordinate = rect.x;
                    console.log(xCoordinate);
=======
                event.data.forEach( (rect) => {
                    console.log(rect.x, rect.y, rect.height, rect.width, rect.color);
                    xCoordinateSubject.next(rect.x);
                    yCoordinateSubject.next(rect.y);
>>>>>>> 4b303f1d4fe4b49a8499621b35cde4dbfec62764
                });
            }
        });

        tracking.track('#myVideo', colors);
    }

    ngOnInit(){
        this.sounds = [new Howl({src:'../../assets/audio/Famoush.wav'}),
                      new Howl({src:'../../assets/audio/Famoush.wav'}),
                      new Howl({src:'../../assets/audio/Famoush.wav'}),
                      new Howl({src:'../../assets/audio/Famoush.wav'})];
    }

    ngAfterViewInit() {
<<<<<<< HEAD
        this.startVideo(this.userCursorX);
        // setInterval(this.generateFallingObject(), 1000);
        // this.generateFallingObject();
=======
        this.startVideo(this.cursorXCoordinateSubject, this.cursorYCoordinateSubject);
        this.cursorXCoordinateSubject
        .subscribe(
          (data) => {
            console.log('x coordinates: ' + data);
          }
          this.cursorYCoordinateSubject
          .subscribe(
            (data) => {
              console.log('y coordinates: ' + data);
            }
        );
    }

    playSoundZero(){
        this.sounds[0].play();
    }
    playSoundOne(){
        this.sounds[1].play();
    }
    playSoundTwo(){
        this.sounds[2].play();
    }
    playSoundThree(){
        this.sounds[3].play();
>>>>>>> 4b303f1d4fe4b49a8499621b35cde4dbfec62764
    }

    // Side as in left or right side. Region as in upper left, lower right.
    generateFallingObject() {
        console.log('Generating');
        const myVar = 100 + 'px';
        const imageItem = this.renderer.createElement('img');
        this.renderer.addClass(imageItem, 'hit-indicator');
        this.renderer.setProperty(imageItem, 'src',
            'https://upload.wikimedia.org/wikipedia/commons/' +
            'thumb/4/4a/Sphere_wireframe_10deg_10r.svg/2000px-Sphere_wireframe_10deg_10r.svg.png');
        this.renderer.setStyle(imageItem, 'width', '15%');
        this.renderer.setStyle(imageItem, 'height', '15%');
        this.renderer.setStyle(imageItem, 'position', 'absolute');
        this.renderer.setStyle(imageItem, 'left', '150px');
        this.renderer.setStyle(imageItem, 'top', myVar);
        this.renderer.setAttribute(imageItem, 'appAnimateObject', '');
        this.renderer.setAttribute(imageItem, 'appAnimateObject', '');
        // this.renderer.set
        console.log(this.elemRef.nativeElement);
        this.renderer.appendChild(this.elemRef.nativeElement.querySelector('div'), imageItem);
        console.log(imageItem);
        this.changeXPosition(imageItem);
    }
    changeXPosition(image) {
        console.log(this.elemRef.nativeElement.querySelector);
        var counter = 0;
            const myInterval = setInterval(() => {
                const xCoordinate = counter + 'px';
                this.renderer.setStyle(image, 'top', xCoordinate);
                // console.log('Waiting ' + xCoordinate);
                counter = counter + 20;
                if (counter === 500) {
                    // console.log('change image color');
                }
                if (counter >= 700) {
                    clearInterval(myInterval);
                }
            }, 50);
    }
}
