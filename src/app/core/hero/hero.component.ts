import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit, AfterViewInit {

  constructor(private _elementRef : ElementRef) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // this.playVideo();
    this.muteVideo();
  }

  muteVideo () {
    let videoElement = this._elementRef.nativeElement.querySelector(`#vid`);
    videoElement.muted = true;
    videoElement.play();
  }
}
