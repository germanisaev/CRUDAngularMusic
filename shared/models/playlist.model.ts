import { PlaylistDetail } from "./playlist-detail.model";
import { Song } from "./song.model";
import { PlaylistSort } from "./sort.model";

export class Playlist {
    Id: number;
    Name: string;
    Photo: string;
    Created: string;
    Sorted?: PlaylistSort;
    UserId: number;
}
/*
export class Playlist {
    Id: number = 0;
    Name: string = '';
    Photo: string = '';
    Created: string = '';
    Sorted?: PlaylistSort = null;
    UserId: number = 0;
    MusicId: string = '';
    Songs?: Song[] = [];

    public get SavedSort(): PlaylistSort {
        return this.Sorted;
    }

    public set SavedSort(sortData: PlaylistSort) {
        this.Sorted = new PlaylistSort(sortData);
    }

    public get SavedSongs(): Song[] {
        return this.Songs;
    }

    public set SavedSongs(songData: Song[]) {
        this.Songs = songData.map(song => new Song(song));
    }
}
*/
/*

constructor(instanceData?: Playlist) {
        if (instanceData) {
            this.deserialize(instanceData);
        }
    }

    private deserialize(instanceData: Playlist) {
        // Note this.active will not be listed in keys since it's declared, but not defined
        const keys = Object.keys(this);

        for (const key of keys) {
            if (instanceData.hasOwnProperty(key)) {
                this[key] = instanceData[key];
            }
        }
    }
    "songs": [
        {
          "name": "Enrique Iglesias",
          "photo": "./assets/music/imgs/artists/enrique_iglesias-bailando.jpg",
          "created": "2010",
          "album": 4,
          "file": "./assets/music/Enrique Iglesias - Bailando ft. Descemer Bueno, Gente De Zona (Español).mp3",
          "song": "Bailando ft. Descemer Bueno, Gente De Zona"
        }
      ],
      "name": "Lations",
      "photo": "./assets/music/imgs/apple_music.jpg",
      "created": "Sun Dec 13 2020 13:05:06 GMT+0200 (Israel Standard Time)",
      "sorted": {},
      "id": 1
*/