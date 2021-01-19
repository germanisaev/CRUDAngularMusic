import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

//import songs from '../../../assets/music/music.json'; 

//import albums from '../../../assets/music/albums.json';  

import { Album } from '../models/album.model';
import { Song } from '../models/song.model';
import { Playlist } from '../models/playlist.model';

import { environment } from '../../../environments/environment';
import { SongPlaylist } from '../models/songPlaylist.model';
import { PlaylistSort } from '../models';
import { PlaylistFilter } from '../models/filter.model';



@Injectable({ providedIn: 'root' })
export class ArtistService {

    private REST_API_SERVER: string = environment.apiUrl; //'http://localhost:3000';
    log: any;
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(private http: HttpClient) { }
    /*
    readConfigSongs() {
        return songs;
    }

    readConfigAlbums() {
        return albums;
    }
    */
    GetAlbums(): Observable<Album[]> {
        return this.http.get<Album[]>(`${this.REST_API_SERVER}/album`).pipe(
            retry(3),
            catchError(this.handleError)
        );
    }

    GetAlbumBy(albumId: any): Observable<Song[]> {
        return this.http.get<Song[]>(`${this.REST_API_SERVER}/song/album/${albumId}`).pipe(
            retry(3),
            catchError(this.handleError)
        );
    }

    GetPlaylistByUser(userId: any): Observable<Playlist[]> {
        return this.http.get<Playlist[]>(`${this.REST_API_SERVER}/playlist/user/${userId}`).pipe(
            retry(3),
            catchError(this.handleError)
        );
    }

    GetSongs(): Observable<Song[]> {
        return this.http.get<Song[]>(`${this.REST_API_SERVER}/song`).pipe(
            retry(3),
            catchError(this.handleError)
        );
    }

    GetPlaylists() {
        return this.http.get<Playlist[]>(`${this.REST_API_SERVER}/playlist`).pipe(
            retry(1),
            catchError(this.handleError)
        );
    }

    GetPlaylistBy(playlistId: any): Observable<Playlist> {
        return this.http.get<Playlist>(`${this.REST_API_SERVER}/playlist/${playlistId}`).pipe(
            retry(3),
            catchError(this.handleError)
        );
    }

    GetPlaylistSongsBy(playlistId: any): Observable<SongPlaylist[]> {
        return this.http.get<SongPlaylist[]>(`${this.REST_API_SERVER}/playlist/songs/${playlistId}`).pipe(
            retry(3),
            catchError(this.handleError)
        );
    }

    GetAllArtists(): Observable<string[]> {
        return this.http.get<string[]>(`${this.REST_API_SERVER}/sort/artist`).pipe(
            retry(3),
            catchError(this.handleError)
        );
    }
    GetCreatedByArtist(name): Observable<string[]> {
        return this.http.get<string[]>(`${this.REST_API_SERVER}/sort/created/${name}`).pipe(
            retry(3),
            catchError(this.handleError)
        );
    }

    GetSortByUser(userId: any): Observable<PlaylistSort> {
        return this.http.get<PlaylistSort>(`${this.REST_API_SERVER}/sorts/user/${userId}`).pipe(
            retry(3),
            catchError(this.handleError)
        );
    }

    GetFilterByUser(userId: any): Observable<PlaylistSort> {
        return this.http.get<PlaylistSort>(`${this.REST_API_SERVER}/filters/user/${userId}`).pipe(
            retry(3),
            catchError(this.handleError)
        );
    }

    GetSongsByUser(userId: any): Observable<SongPlaylist[]> {
        // playlist/song/user/3
        return this.http.get<SongPlaylist[]>(`${this.REST_API_SERVER}/playlist/song/user/${userId}`).pipe(
            retry(3),
            catchError(this.handleError)
        );
    }

    CreateFilter(data: PlaylistFilter): Observable<PlaylistFilter> {
        //debugger;
        return this.http.post<PlaylistFilter>(`${this.REST_API_SERVER}/filter`, JSON.stringify(data), this.httpOptions)
            .pipe(
                catchError(this.handleError)
            )
    }

    CreatePlaylist(data: Playlist): Observable<Playlist> {
        //debugger;
        return this.http.post<Playlist>(`${this.REST_API_SERVER}/playlist`, JSON.stringify(data), this.httpOptions)
            .pipe(
                catchError(this.handleError)
            )
    }

    CreateSongPlaylist(data: SongPlaylist): Observable<SongPlaylist> {
        //debugger;
        return this.http.post<SongPlaylist>(`${this.REST_API_SERVER}/playlist/song`, JSON.stringify(data), this.httpOptions)
            .pipe(
                catchError(this.handleError)
            )
    }

    CreateSort(data: PlaylistSort): Observable<PlaylistSort> {
        return this.http.post<PlaylistSort>(`${this.REST_API_SERVER}/sort`, JSON.stringify(data), this.httpOptions)
            .pipe(
                catchError(this.handleError)
            )
    }

    PutSortByUser(id: any, data: PlaylistSort): Observable<PlaylistSort> {
        return this.http.put<PlaylistSort>(`${this.REST_API_SERVER}/sortput/user/${id}`, JSON.stringify(data), this.httpOptions)
            .pipe(
                catchError(this.handleError)
            )
    }

    PutFilterByUser(id: any, data: PlaylistFilter): Observable<PlaylistFilter> {
        return this.http.put<PlaylistFilter>(`${this.REST_API_SERVER}/filterput/user/${id}`, JSON.stringify(data), this.httpOptions)
            .pipe(
                catchError(this.handleError)
            )
    }

    PatchSortByUser(id: any, data: PlaylistSort): Observable<PlaylistSort> {
        //debugger;
        return this.http.patch<PlaylistSort>(`${this.REST_API_SERVER}/sortpatch/user/${id}`, JSON.stringify(data), this.httpOptions)
            .pipe(
                catchError(this.handleError)
            )
    }

    UpdatePlaylist(id: any, data: Playlist): Observable<Playlist> {
        return this.http.put<Playlist>(`${this.REST_API_SERVER}/playlist/${id}`, JSON.stringify(data), this.httpOptions)
            .pipe(
                catchError(this.handleError)
            )
    }

    PatchPlaylist(id, song) {
        this.http.patch(`${this.REST_API_SERVER}/playlist/${id}`, JSON.stringify({ songs: song }))
            .pipe(
                catchError(this.handleError)
            ); 
    }

    DeleteSongPlaylist(songId: any) {
        //debugger;
        return this.http.delete<SongPlaylist>(`${this.REST_API_SERVER}/playlist/song/${songId}`, this.httpOptions)
            .pipe(
                catchError(this.handleError)
            )
    }

    DeleteSongByPlaylist(playlistId: any) {
        return this.http.delete<SongPlaylist>(`${this.REST_API_SERVER}/song/playlist/${playlistId}`, this.httpOptions)
            .pipe(
                catchError(this.handleError)
            )
    }

    DeletePlaylist(id) {
        //debugger;
        return this.http.delete<Playlist>(`${this.REST_API_SERVER}/playlist/${id}`, this.httpOptions)
            .pipe(
                catchError(this.handleError)
            )
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError('Something bad happened. Please try again later.');
    }
}