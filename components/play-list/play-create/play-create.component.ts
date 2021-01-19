import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PlaylistSort } from 'src/app/shared/models';
import { Playlist } from 'src/app/shared/models/playlist.model';
import { Song } from 'src/app/shared/models/song.model';
import { AccountService, AlertService, ArtistService } from '../../../shared/services';

@Component({
  selector: 'app-play-create',
  templateUrl: './play-create.component.html',
  styleUrls: ['./play-create.component.css']
})
export class PlayCreateComponent implements OnInit {
  playlistForm: FormGroup;
  loading = false;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService,
    private listService: ArtistService
  ) { }

  ngOnInit(): void {
    //debugger;
    const user = JSON.parse(localStorage.getItem('user'));
    this.playlistForm = this.formBuilder.group({
      Name: ['', Validators.required],
      Photo: ['./assets/music/imgs/apple_music.jpg'],
      Created: [new Date().toString()],
      Sorted: new PlaylistSort(),
      UserId: user.Id,
      //Songs: this.formBuilder.array([]) 
    });
  }

  get f() { return this.playlistForm.controls; }

  setSort(): FormGroup {
    return this.formBuilder.group({
      Id: [0, Validators.required],
      UserId: [0, Validators.required],
      Artists: ['', Validators.required],
      Albums: ['', Validators.required],
      Songs: ['', Validators.required],
      Genres: ['', Validators.required]
    });
  }

  onSubmit() {
    //debugger;
    this.submitted = true;

    // stop here if form is invalid
    if (this.playlistForm.invalid) {
      return;
    }

    let playlist = new Playlist();
    playlist = this.playlistForm.value;
    this.listService.CreatePlaylist(playlist).subscribe(res => {
      console.log('Post created successfully!');
      this.router.navigateByUrl('/dashboard/playlist');
    });

    //console.log(this.playlistForm.value);

  }

}
