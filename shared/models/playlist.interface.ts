import { PlaylistSort, Song } from ".";

export interface IPlaylist {
    id: number;
    name: string;
    photo: string;
    created: string;
    sorted?: PlaylistSort;
    songs?: Song[];
}