import { Component, OnInit } from '@angular/core';
import { Album } from '../../shared/models/album.model';
import { ArtistService } from '../../shared/services/artist.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {
  albums: Album[] = [];
  title = "Albums";
  searchText: string = '';
  
  constructor(private service: ArtistService) { }

  ngOnInit(): void {
    this.getAlbums();
  }

  getAlbums() {
    this.service.GetAlbums().subscribe(response => {
      this.albums = response;
      console.log(this.albums);
    });
  }

}
