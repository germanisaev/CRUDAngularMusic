import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SongPlaylist } from 'src/app/shared/models/songPlaylist.model';
import { ArtistService } from '../../shared/services';
//import { ConfirmDialogService } from '../confirm-dialog/confirm-dialog.service';
//import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
//import { ConfirmModalComponent } from '../../shared/components/confirm-modal.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-play-list',
  templateUrl: './play-list.component.html',
  styleUrls: ['./play-list.component.css']
})
export class PlayListComponent implements OnInit {

  modalRef: BsModalRef;

  isShow: boolean = false;
  playlistForm: FormGroup;
  playlists: Array<any> = [];
  songsPlaylist: Array<SongPlaylist> = new Array();

  constructor(private listService: ArtistService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getPlaylists();
  }

  newPlaylist() {
    alert('new Playlist');
    this.isShow = !this.isShow;
  }

  getPlaylists() {
    //this.playlists = ['Latinos', 'Pops', 'Default']; GetPlaylistByUser
    let user = JSON.parse(localStorage.getItem('user'));
    this.listService.GetPlaylistByUser(user.Id).subscribe(response => {
      this.playlists = response;
    });
    /*
    this.listService.GetPlaylists().subscribe(response => {
      this.playlists = response;
    });
    */
  }

  onDelete(id) {
    let isResult = this.getSongsPlaylist(id);
    //console.log('isResult: ' + isResult);
    if (isResult) {
      this.modalRef = this.modalService.show(ConfirmDialogComponent);
      this.modalRef.content.onClose.subscribe(result => {
        //console.log('results', result);
        if (result == true) {
          this.listService.DeleteSongByPlaylist(id).subscribe(response => {
            console.log(response);
          });
          this.listService.DeletePlaylist(id).subscribe(response => {
            console.log(response);
            this.getPlaylists();
          });
        }
      });
    }
    else {
      this.modalRef = this.modalService.show(ConfirmDialogComponent);
      this.modalRef.content.onClose.subscribe(result => {
        //console.log('results', result);
        if (result == true) {
          this.listService.DeletePlaylist(id).subscribe(response => {
            console.log(response);
            this.getPlaylists();
          });
        }
      });
    }
  }

  getSongsPlaylist(playlist_id): any {
    //debugger;
    this.listService.GetPlaylistSongsBy(playlist_id).subscribe(response => {
      this.songsPlaylist = response;
    });
    if (this.songsPlaylist.length > 0) {
      return true;
    }
  }


}
