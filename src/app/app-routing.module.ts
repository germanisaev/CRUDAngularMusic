import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlbumsComponent } from './components/albums/albums.component';
import { ArtistComponent } from './components/artist/artist.component';

import { PlayListComponent } from './components/play-list/play-list.component';
import { PlayCreateComponent } from './components/play-list/play-create/play-create.component';
import { PlayDetailComponent } from './components/play-list/play-detail/play-detail.component';
import { SongComponent } from './components/song/song.component';
import { GenresComponent } from './components/genres/genres.component';

import { LoginComponent } from './components/account/login/login.component';
import { LayoutComponent } from './components/account/layout/layout.component';
import { RegisterComponent } from './components/account/register/register.component';

//import { AuthGuardService as AuthGuard } from './shared/helpers/auth-guard.service';
import { AuthGuard } from './shared/helpers'
import { SongsPlaylistComponent } from './components/songs-playlist/songs-playlist.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';


const routes: Routes = [
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'albums', pathMatch: 'full' },
      { path: 'albums', component: AlbumsComponent },
      { path: 'songs', component: SongComponent },
      { path: 'artists', component: ArtistComponent },
      { path: 'genres', component: GenresComponent },
      { path: 'songs/:id', component: SongComponent },
      { path: 'playlist', component: PlayListComponent },
      { path: 'playlist/songs/:id', component: SongsPlaylistComponent },
      { path: 'playlist/create', component: PlayCreateComponent },
      { path: 'playlist/detail/:id', component: PlayDetailComponent },
    ]
  },
  {
    path: '', component: LayoutComponent,
    children: [
      { path: '', component: LoginComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]
  },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

