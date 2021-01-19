import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Playlist } from 'src/app/shared/models';
import { SongPlaylist } from 'src/app/shared/models/songPlaylist.model';
import { Song } from '../../../shared/models/song.model';
import { ArtistService } from '../../../shared/services';

@Component({
  selector: 'app-play-detail',
  templateUrl: './play-detail.component.html',
  styleUrls: ['./play-detail.component.css']
})
export class PlayDetailComponent implements OnInit {

  playlistSongs: Array<Playlist> = new Array();
  playlist_id: string;

  currentSong: string;
  isShow: boolean[] = [];
  isPlay: boolean = false;
  searchText: string = '';

  constructor(private service: ArtistService, private actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getMyPlaylists();
  }

  getMyPlaylists() {
    this.actRoute.paramMap.subscribe(params => {
      this.playlist_id = params.get('id');
    });
    //debugger;
    this.service.GetPlaylistBy(this.playlist_id).subscribe(response => {
      //this.playlistSongs = response;
    });
  }

  onDelete(id) {
    this.service.DeletePlaylist(id).subscribe(response => {
      console.log(response);
      this.getMyPlaylists();
    });
  }

}
