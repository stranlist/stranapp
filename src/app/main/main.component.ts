import { Component, OnInit } from '@angular/core';

import { MainService } from "./main.service";

import { Track } from 'ngx-audio-player';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private mainService: MainService) { }

  ngOnInit(): void {
    this.mainService.GetList().subscribe(res => {
      this.msaapPlaylist = new Array<Track>();

      let list = res as [];

      list.forEach(element => {
        this.msaapPlaylist.push({
          title: element["id"] + " - " + element["title"],
          link: "https://archive.org/download/stranlist/" + element["id"] + ".mp3"
        });
      });
    });
  }

  msaapDisplayTitle = true;
  msaapDisplayPlayList = true;
  msaapPageSizeOptions = [5, 10, 20, 30];
  msaapDisplayVolumeControls = true;

  msaapPlaylist: Track[] = [];

  public onEnded(event) {
    console.log(event);
  }

}
