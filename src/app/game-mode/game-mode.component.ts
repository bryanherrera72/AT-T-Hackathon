import { Component, OnInit, ViewChild, AfterViewInit, Renderer2, ElementRef } from '@angular/core';
// node_modules/tracking/build/tracking.js
import 'tracking/build/tracking';
import 'tracking';
// node_modules/tracking/build/data/face.js
import 'tracking/build/data/face';
import {Subject} from 'rxjs/Subject';


import {Howl, Howler} from 'howler';
import { Point } from '../models/point.model';


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

    @ViewChild('upperLeft') upperLeftBox;
    upperLBoxBound:Point[];

    @ViewChild('upperRight') upperRightBox;
    upperRBoxBound:Point[];

    @ViewChild('lowerLeft') lowerLeftBox;
    lowerLBoxBound:Point[];

    @ViewChild('lowerRight') lowerRightBox;
    lowerRBoxBound:Point[];
    
    bounds:any[];
    cdnEndpoint = 'http://d33k0w5tn3c49w.cloudfront.net/'
    hitBoxImage = 'http://www.freeiconspng.com/uploads/circle-png-7.png';
    hitBoxImages = ['CircleTeal.png', 'CircleRed.png', 'CircleGreen.png']
    endpoint0 = this.cdnEndpoint + this.hitBoxImages[0];
    endpoint1 = this.cdnEndpoint + this.hitBoxImages[0];
    endpoint2 = this.cdnEndpoint + this.hitBoxImages[0];
    endpoint3 = this.cdnEndpoint + this.hitBoxImages[0];
    boxHit = new Subject();
    
    canCheck: boolean = true;
    sounds:Howl[];
    song:Howl;
    @ViewChild('myVideo') hardwareVideo;

    collisionDetection = new Subject();

    constructor() {}

    startVideo() {


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
        //tracking.ColorTracker.prototype.minDimension = 1;

        var colors = new tracking.ColorTracker(['yellow']);
        colors.on('track', (event) => {
            if (event.data.length === 0) {
                // No colors were detected in this frame.
            } else {
                event.data.forEach((rect) => {
                    this.collisionDetection.next(new Point((this.hardwareVideo.nativeElement.clientWidth - rect.x), rect.y));
                });
            }
        });

        tracking.track('#myVideo', colors);
        
    }

    ngOnInit(){
        this.sounds = [new Howl({src:'../../assets/audio/how_bout_dat_g.wav'}), 
                      new Howl({src:'../../assets/audio/i_do_remember_a.wav'}),
                      new Howl({src:'../../assets/audio/i_do_remember_b.wav'}),
                      new Howl({src:'../../assets/audio/organic.wav'})];

        this.song = new Howl({src:'../../assets/audio/hip_hop.mp3'});
        
        this.upperLBoxBound = [new Point(this.upperLeftBox.nativeElement.x, this.upperLeftBox.nativeElement.y),
            new Point((this.upperLeftBox.nativeElement.x + this.upperLeftBox.nativeElement.width), this.upperLeftBox.nativeElement.y),
            new Point(this.upperLeftBox.nativeElement.x,(this.upperLeftBox.nativeElement.y + this.upperLeftBox.nativeElement.width)),
            new Point((this.upperLeftBox.nativeElement.x + this.upperLeftBox.nativeElement.width),(this.upperLeftBox.nativeElement.y + this.upperLeftBox.nativeElement.width))
        ];
        this.upperRBoxBound =  [new Point(this.upperRightBox.nativeElement.x, this.upperRightBox.nativeElement.y),
            new Point((this.upperRightBox.nativeElement.x + this.upperRightBox.nativeElement.width), this.upperRightBox.nativeElement.y),
            new Point(this.upperRightBox.nativeElement.x,(this.upperRightBox.nativeElement.y + this.upperRightBox.nativeElement.width)),
            new Point((this.upperRightBox.nativeElement.x + this.upperRightBox.nativeElement.width),(this.upperRightBox.nativeElement.y + this.upperRightBox.nativeElement.width))
        ];
        this.lowerLBoxBound =  [new Point(this.lowerLeftBox.nativeElement.x, this.lowerLeftBox.nativeElement.y),
            new Point((this.lowerLeftBox.nativeElement.x + this.lowerLeftBox.nativeElement.width), this.lowerLeftBox.nativeElement.y),
            new Point(this.lowerLeftBox.nativeElement.x,(this.lowerLeftBox.nativeElement.y + this.lowerLeftBox.nativeElement.width)),
            new Point((this.lowerLeftBox.nativeElement.x + this.lowerLeftBox.nativeElement.width),(this.lowerLeftBox.nativeElement.y + this.lowerLeftBox.nativeElement.width))
        ];
        this.lowerRBoxBound =  [new Point(this.lowerRightBox.nativeElement.x, this.lowerRightBox.nativeElement.y),
            new Point((this.lowerRightBox.nativeElement.x + this.lowerRightBox.nativeElement.width), this.lowerRightBox.nativeElement.y),
            new Point(this.lowerRightBox.nativeElement.x,(this.lowerRightBox.nativeElement.y + this.lowerRightBox.nativeElement.width)),
            new Point((this.lowerRightBox.nativeElement.x + this.lowerRightBox.nativeElement.width),(this.lowerRightBox.nativeElement.y + this.lowerRightBox.nativeElement.width))
        ];
        
        this.bounds = [this.upperLBoxBound, this.upperRBoxBound, this.lowerLBoxBound, this.lowerRBoxBound];
        for(let i = 0; i < this.bounds.length; i ++){
           console.log(this.bounds[i]);
        }

        this.collisionDetection.subscribe(
            (point:Point)=>{
                if(this.canCheckCollision()){
                    this.checkIfCollision(point);
                }
            }
        );
    }

    ngAfterViewInit() {
        this.startVideo();
        // this.cursorXCoordinateSubject
        // .subscribe(
        //   (data) => {
        //     console.log('x coordinates: ' + data);
        //   }
        //   this.cursorYCoordinateSubject
        //   .subscribe(
        //     (data) => {
        //       console.log('y coordinates: ' + data);
        //     }
        // );
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
    }

    //takes a param point, checks if param is inside any box.
    checkIfCollision(point:Point){
        if(!(this.bounds == null)){
            
            for(let i = 0; i < this.bounds.length; i++){
                if(point.x+150 > this.bounds[i][0].x && point.x+50 < this.bounds[i][1].x && point.y - 200 < this.bounds[i][2].y && point.y - 200 > this.bounds[i][0].y){
                    this.playSound(i);
                    this.boxHit.next(i);
                }
                
                }
            }
        
    }

    playSound(index: number){
        this.boxHit.subscribe(
            (data) => {
                switch(data) {
                    case 0:
                    this.endpoint0 = this.cdnEndpoint + this.hitBoxImages[1];
                    break;
                    case 1:
                    
                    this.endpoint1 = this.cdnEndpoint + this.hitBoxImages[1]; 
                    break;
                    case 2:
                    this.endpoint2 = this.cdnEndpoint + this.hitBoxImages[1];
                    break;
                    case 3: 
                    this.endpoint3 = this.cdnEndpoint + this.hitBoxImages[1];
                    break;
                    default: 
                    break;
                }
                console.log(data);
            }
        );
        this.canCheck = false;
        const id = setTimeout(
            ()=>{
                this.sounds[index].play();
                this.canCheck = true;
            }
        , 100);
        setTimeout( () => {
            this.endpoint0 = this.cdnEndpoint + this.hitBoxImages[0];

            this.endpoint1 = this.endpoint0 = this.cdnEndpoint + this.hitBoxImages[0];

            this.endpoint2 = this.endpoint0 = this.cdnEndpoint + this.hitBoxImages[0];

            this.endpoint3 = this.endpoint0 = this.cdnEndpoint + this.hitBoxImages[0];
        }, 100); 
    }

    canCheckCollision(){
        return this.canCheck;
    }

    playSong(){
        this.song.play();
    }
    pauseSong(){
        this.song.pause();
    }
    // Side as in left or right side. Region as in upper left, lower right.
    generateFallingObject() {
    //     console.log('Generating');
    //     const myVar = 100 + 'px';
    //     const imageItem = this.renderer.createElement('img');
    //     this.renderer.addClass(imageItem, 'hit-indicator');
    //     this.renderer.setProperty(imageItem, 'src',
    //         'https://upload.wikimedia.org/wikipedia/commons/' +
    //         'thumb/4/4a/Sphere_wireframe_10deg_10r.svg/2000px-Sphere_wireframe_10deg_10r.svg.png');
    //     this.renderer.setStyle(imageItem, 'width', '15%');
    //     this.renderer.setStyle(imageItem, 'height', '15%');
    //     this.renderer.setStyle(imageItem, 'position', 'absolute');
    //     this.renderer.setStyle(imageItem, 'left', '150px');
    //     this.renderer.setStyle(imageItem, 'top', myVar);y
    //     this.renderer.setAttribute(imageItem, 'appAnimateObject', '');
    //     this.renderer.setAttribute(imageItem, 'appAnimateObject', '');
    //     // this.renderer.set
    //     console.log(this.elemRef.nativeElement);
    //     this.renderer.appendChild(this.elemRef.nativeElement.querySelector('div'), imageItem);
    //     console.log(imageItem);
    //     this.changeXPosition(imageItem);
    // }
    // changeXPosition(image) {
    //     console.log(this.elemRef.nativeElement.querySelector);
    //     var counter = 0;
    //         const myInterval = setInterval(() => {
    //             const xCoordinate = counter + 'px';
    //             this.renderer.setStyle(image, 'top', xCoordinate);
    //             // console.log('Waiting ' + xCoordinate);
    //             counter = counter + 20;
    //             if (counter === 500) {
    //                 // console.log('change image color');
    //             }
    //             if (counter >= 700) {
    //                 clearInterval(myInterval);
    //             }
    //         }, 50);
    }
}
