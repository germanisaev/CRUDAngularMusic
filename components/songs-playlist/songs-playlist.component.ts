import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SongPlaylist } from 'src/app/shared/models/songPlaylist.model';
import { ArtistService } from '../../shared/services/artist.service';

@Component({
  selector: 'app-songs-playlist',
  templateUrl: './songs-playlist.component.html',
  styleUrls: ['./songs-playlist.component.css']
})
export class SongsPlaylistComponent implements OnInit {

  playlist_id: any;
  songsPlaylist: Array<SongPlaylist> = new Array();
  currentSong: string;
  isShow: boolean[] = [];
  isPlay: boolean = false;
  isLike: boolean = false;
  searchText: string;

  constructor(private service: ArtistService, private actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadSongsPlaylist();
  }

  loadSongsPlaylist() {
    this.actRoute.paramMap.subscribe(params => {
      this.playlist_id = params.get('id');
    });

    if (this.playlist_id) {
      this.getSongsPlaylist(this.playlist_id);
    }
  }

  getSongsPlaylist(playlist_id) {
    //debugger;
    this.service.GetPlaylistSongsBy(playlist_id).subscribe(response => {
      this.songsPlaylist = response;
      console.log(this.songsPlaylist);
    });
  }

  onPlay(songFile, i) {
    //alert(songFile);
    this.isShow = [];
    this.currentSong = songFile;
    this.isShow[i] = true;
    this.isPlay = true;
  }

  onDelete(song_id: any) {
    //debugger;
    this.service.DeleteSongPlaylist(song_id).subscribe(response => {
      //console.log(response);
      this.loadSongsPlaylist();
    });
  }
  /*
  getSongs() {
    this.service.GetSongs().subscribe(response => {
      this.songs = response;
      console.log(this.songs);
    });
  }
  */

}
