import { Component, OnInit } from '@angular/core';

import { MainService } from './main.service';
import { MusicModel } from '../models/music.model';

import { Track } from 'ngx-audio-player';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public audioOptions = {
    displayPlayList: false,
    playList: null,
    displayTitle: "",
    pageSizeOptions: [5, 10, 20, 30, 50],
    displayVolumeControls: true,
    musicModel: new MusicModel()
  };

  public mainMusicList: Array<MusicModel>;
  public displayMusicList: Array<MusicModel>;

  constructor(private mainService: MainService) {
    this.mainMusicList = new Array<MusicModel>();
    this.displayMusicList = new Array<MusicModel>();
  }

  ngOnInit(): void {
    this.mainService.GetList().subscribe(res => {
      this.mainMusicList = res as Array<MusicModel>;
      this.displayMusicList = res as Array<MusicModel>;
    });
  }

  public getTrack(model: MusicModel): Track {
    let trackModel = new Track();
    trackModel.title = model.title;
    trackModel.link = "https://archive.org/download/stranlist/" + model.id + ".mp3";

    return trackModel;
  }

  public onEnded(event) {
    let newIndex = this.displayMusicList.indexOf(this.audioOptions.musicModel) + 1;
    let model = this.displayMusicList[newIndex];

    if (model) {
      this.selectMusic(model);
    }
  }

  public searchChange(event) {
    let searchText: string = event.target.value;
    if (searchText.length < 3) {
      this.displayMusicList = this.mainMusicList;
      document.getElementById("mat-card-list").scroll(0, 0);
      return;
    }

    this.displayMusicList = this.mainMusicList.filter(x => x.title.toLowerCase().includes(searchText.toLowerCase()));
    document.getElementById("mat-card-list").scroll(0, 0);
  }

  public selectMusic(item: MusicModel) {
    this.audioOptions.playList = [this.getTrack(item)];
    this.audioOptions.displayTitle = item.title;
    this.audioOptions.musicModel = item;
  }

}
