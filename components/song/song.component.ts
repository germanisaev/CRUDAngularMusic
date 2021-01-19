import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { PlaylistSort } from 'src/app/shared/models';
import { Playlist } from 'src/app/shared/models/playlist.model';
import { SongPlaylist } from 'src/app/shared/models/songPlaylist.model';
import { Song } from '../../shared/models/song.model';
import { ArtistService } from '../../shared/services/artist.service';
import { multiFilter } from '../../shared/functions/multiFilter.function';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { PlaylistFilter } from 'src/app/shared/models/filter.model';
//import { ModalService } from '../player-dialog/modal.service';

export class Filtered {

  public Artists: string;
  public Created: string;
  /*
  public get ArtistValue() : string {
    return this.Artists;
  }
  public set ArtistValue(v : string) {
    this.Artists = v;
  }
  public get CreateValue(): string {
    return this.Created;
  }
  public set CreateValue(v: string) {
    this.Created = v;
  }
  */

}

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css']
})
export class SongComponent implements OnInit, AfterViewInit {

  //@ViewChildren('audio') audioElms: ElementRef[];

  filterForm: FormGroup;
  sortForm: FormGroup;
  album_id: string;
  songs: Array<any> = new Array();
  filterSongs: Array<any> = new Array();
  artists: Array<string> = new Array();
  createds: Array<string> = new Array();
  sorted: PlaylistSort;
  filtered: PlaylistSort;
  isThList: boolean = true;
  isThLarge: boolean = false;
  isTh: boolean = false;
  currentSong: Song;
  //isShow: boolean[] = [];
  isShow: boolean[] = new Array(false);
  isPlay: boolean = false;
  isLike: boolean = false;
  searchText: string = '';
  playlists: Array<any> = [];
  songsPlaylist: Array<Song> = new Array();
  submitted = false;
  loading = false;
  isMessage: boolean = false;
  loadSortBy: any;
  isActive = false;

  MessageFilter: string = '';
  closeResult: string;

  sortArray: Array<string> = ['Artists', 'Albums', 'Songs', 'Genres', 'Created']; // 'Albums', 'Songs', 'Genres',
  selectedSortValues = [];
  /*
  dataArray: Array<any> = [
    { name: 'Artists', value: 'artists' },
    { name: 'Albums', value: 'albums' },
    { name: 'Songs', value: 'songs' },
    { name: 'Genres', value: 'genres' },
    { name: 'Created', value: 'created' }
  ];
  */

  constructor(
    private formBuilder: FormBuilder,
    private service: ArtistService,
    private actRoute: ActivatedRoute,
    private modalService: NgbModal
  ) {
  }

  get f() { return this.filterForm.controls; }
  //get n() { return this.f.get['Name']; }
  //get c() { return this.f.get['Created']; }

  open(content, song, i) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

    this.isShow = new Array(false);
    this.currentSong = new Song();
    this.currentSong = song;
    this.isShow[i] = true;
    this.isPlay = true;
  }

  openFilter(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openSort(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnInit(): void {
    this.getArtists();
    this.CreateFilterForm();
    this.CreateSortForm();
    this.getPlaylists();
    this.LoadSongs();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      //this.LoadFilter(); 
      this.LoadSort();
    }, 500);
  }

  onPrev(id: any) {
    this.currentSong = new Song();
    for (let i = 0; i < this.songs.length; i++) {
      if (this.songs[i].Id == id) {
        i--;
        //if (-1 > i) {
        this.currentSong = this.songs[i];
        //}
        return;
      }
    }
  }

  onNext(id: any) {
    this.currentSong = new Song();
    for (let i = 0; i < this.songs.length; i++) {
      if (this.songs[i].Id == id) {
        i++;
        //if (this.songs.length < i) {
        this.currentSong = this.songs[i];
        //}
        return;
      }
    }
  }

  onChangeArtist(event) {
    console.log(event);
    this.LoadSongs();
    this.getCreatedByArtist(event);
    this.filterForm.patchValue({
      Created: ''
    });
  }

  LoadFilterForm(objFilter) {
    this.filterForm = this.formBuilder.group({
      Name: [objFilter.Artists],
      Created: [objFilter.Created]
    });
  }

  LoadSortForm(objSort) {
    this.sortForm = this.formBuilder.group({
      UserId: [JSON.parse(localStorage.getItem('user')).Id],
      RadioSort: [objSort.Artists]
    });
  }

  LoadFilter() {
    const user = JSON.parse(localStorage.getItem('user'));
    //debugger;
    this.service.GetFilterByUser(user.Id).subscribe(
      response => {
        if (typeof response !== "undefined") {
          console.log('Sort: ' + JSON.stringify(response));
          let objSort = response;
          this.loadSortBy = response;

          //let filtered = new Filtered();
          //filtered.Artists = this.loadSortBy.Artists;
          //filtered.Created = this.loadSortBy.Created;
          this.LoadFilterForm(objSort);
          this.getCreatedByArtist(objSort.Artists);
          this.onLoadFilter();
        }
      },
      error => {
        console.log(error);
        this.CreateFilterForm();
      });
  }

  LoadSort() {
    const user = JSON.parse(localStorage.getItem('user'));
    //debugger;
    this.service.GetSortByUser(user.Id).subscribe(
      response => {
        console.log('Sort: ' + JSON.stringify(response));
        if (typeof response !== "undefined") {
          console.log('Sort: ' + JSON.stringify(response));
          let objSort = response;
          this.loadSortBy = response;

          //let filtered = new Filtered();
          //filtered.Artists = this.loadSortBy.Artists;
          //filtered.Created = this.loadSortBy.Created;
          this.LoadFilterForm(objSort);
          this.getCreatedByArtist(objSort.Artists);
          this.onLoadFilter();
        }
        //this.sorted = response;
      },
      error => {
        console.log(error);
        this.CreateFilterForm();
      }
    );
  }

  LoadSongs() {
    this.actRoute.paramMap.subscribe(params => {
      this.album_id = params.get('id');
      //alert(this.album_id);
    });
    if (this.album_id) {
      this.getSongsBy(this.album_id);
    }
    else {
      this.getSongs();
    }
  }

  CreateFilterForm() {
    this.filterForm = this.formBuilder.group({
      Name: [''],
      Created: ['']
    });
  }

  CreateSortForm() {
    this.sortForm = this.formBuilder.group({
      CheckArray: this.addSortsControls() //this.formBuilder.array([]),  //this.createArray(this.dataArray), //this.formBuilder.array([]),
    });
  }

  addSortsControls() {
    const arr = this.sortArray.map(() => {
      return this.formBuilder.control(false);
    });

    return this.formBuilder.array(arr);
  }

  get sortsArray() {
    return <FormArray>this.sortForm.get('CheckArray');
  }

  getSelectedSortValues() {
    this.selectedSortValues = [];

    this.sortsArray.controls.forEach((control, i) => {
      if (control.value) {
        this.selectedSortValues.push(this.sortArray[i]);
      }
    });

    console.log(this.selectedSortValues);
  }
  /*
  onCheckboxChange(e) {
    const CheckArray: FormArray = this.sortForm.get('CheckArray') as FormArray;
    //debugger;
    if (e.target.checked) {
      let i: number = 0;
      CheckArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          CheckArray.removeAt(i);
          return;
        }
        i++;
      });
      CheckArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      CheckArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          CheckArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
  */

  ClearFilterForm() {
    this.filterForm.reset();
  }

  onClear() {
    this.filterForm.setValue({
      Name: '',
      Created: ''
    });
    this.LoadSongs();
    this.MessageFilter = '';
  }

  onLoadSort() {
    alert('Sort');
  }

  onLoadFilter() {
    this.songs = multiFilter(this.songs, this.filterForm.value);
    if (this.songs.length > 0) {
      this.MessageFilter = this.songs.length + ' results is found after filter';
    }
    else {
      this.MessageFilter = '';
    }
  }

  onCloseAll() {
    this.modalService.dismissAll();
  }

  onSort() {
    if (this.sortForm.invalid) {
      return;
    }
    let data: Array<boolean> = new Array();
    data = this.sortForm.value.CheckArray;
    let filter = new PlaylistFilter();
    filter.UserId = JSON.parse(localStorage.getItem('user')).Id;
    filter.Updated = new Date().toString();
    filter.Artists = data[0];
    filter.Albums = data[1];
    filter.Songs = data[2];
    filter.Genres = data[3];
    filter.Created = data[4];

    console.log('songs after sort: ' + JSON.stringify(filter));

    debugger;
    this.service.GetFilterByUser(filter.UserId).subscribe(
      result => {
        if (result) {
          this.service.PutFilterByUser(filter.UserId, filter).subscribe(response => {
            console.log(response);
          });
        }
      },
      error => {
        console.log(error);
        this.service.CreateFilter(filter).subscribe(response => {
          console.log(response);
        });
      });



    this.onCloseAll();
  }

  onFilter() {
    this.submitted = true;
    this.isMessage = false;
    //debugger;
    if (this.filterForm.invalid) {
      return;
    }

    this.loading = true;

    //this.LoadSongs();
    //debugger;
    this.filterSongs = multiFilter(this.songs, this.filterForm.value);
    console.log('songs after filter: ' + JSON.stringify(this.filterForm.value));
    if (!this.filterSongs.length) {
      this.isMessage = true;
    }
    else {
      this.songs = this.filterSongs;
      // save filter
      let sort = new PlaylistSort();
      const obj = Object(this.filterForm.value);
      //debugger;
      console.log(JSON.stringify(obj));
      if (typeof this.loadSortBy !== "undefined") {
        sort.Id = this.loadSortBy.Id;
      }


      sort.UserId = JSON.parse(localStorage.getItem('user')).Id;
      sort.Artists = obj.Name;
      sort.Created = obj.Created;
      console.log(sort);
      //debugger;
      if (typeof this.loadSortBy !== "undefined") {
        this.service.PutSortByUser(sort.Id, sort).subscribe(response => {
          console.log(response);
        });
      }
      else {
        this.service.CreateSort(sort).subscribe(response => {
          console.log(response);
        });
      }

      this.onCloseAll();

      /*
      this.service.GetSortByUser(sort.UserId).subscribe(
        response => {
          console.log(response);
          
        },
        error => { 
          console.log(error); 
          
        }
      );
      */
    }

    this.loading = false;
  }

  // convenience getter for easy access to form fields

  getSongsBy(album_id) {
    //debugger;
    this.service.GetAlbumBy(album_id).subscribe(response => {
      this.songs = response;
      console.log(this.songs);
    });
  }

  getSongs() {
    this.service.GetSongs().subscribe(response => {
      this.songs = response;
      console.log(this.songs);
    });
  }

  getArtists() {
    this.service.GetAllArtists().subscribe(response => {
      this.artists = response;
      this.artists = this.artists.sort();
      let artistSet = new Set(this.artists);
      this.artists = [...artistSet];
      console.log(this.artists);
    });
  }

  getCreatedByArtist(name) {
    this.service.GetCreatedByArtist(name).subscribe(response => {
      this.createds = response;
      this.createds = this.createds.sort();
      let createdSet = new Set(this.createds);
      this.createds = [...createdSet];
      console.log(this.createds);
    });
  }

  getPlaylists() {
    let user = JSON.parse(localStorage.getItem('user'));
    this.service.GetPlaylistByUser(user.Id).subscribe(response => {
      this.playlists = response;
    });
    /*
    this.service.GetPlaylists().subscribe(response => {
      this.playlists = response;
    });
    */
  }

  onPlay(songFile, i) {
    //alert(songFile);
    //this.isShow = [];
    this.isShow = new Array(false);
    this.currentSong = songFile;
    this.isShow[i] = true;
    this.isPlay = true;
  }

  onAddSongToPlaylist(play: Playlist, song: Song) {
    //alert(play.Id + ' - ' + JSON.stringify(song));
    let playlist = new SongPlaylist();

    playlist.Name = song.Name;
    playlist.Photo = song.Photo;
    playlist.MusicFile = song.MusicFile;
    playlist.Playlist = play.Id;
    playlist.Song = song.Song;
    playlist.Created = song.Created;
    //playlist.songs.push(new Song(songPlaylist));
    //playlist.SavedSongs.push(new Song(songPlaylist));

    this.service.CreateSongPlaylist(playlist).subscribe(response => {
      console.log(response);
    });

  }

  onChange(expression: any) {
    switch (expression) {
      case 1:
        this.isThList = true;
        this.isThLarge = false;
        this.isTh = false;
        break;
      case 2:
        this.isThList = false;
        this.isThLarge = true;
        this.isTh = false;
        break;
      case 3:
        this.isThList = false;
        this.isThLarge = false;
        this.isTh = true;
        break;
    }
  }

}
