export class PlaylistSort {

    public Id: number;
    public UserId: number;
    public Artists: string;
    public Albums: string;
    public Songs: string;
    public Genres: string;
    public Created: string;

    constructor(
        fields?: {
            Id?: number,
            UserId: number,
            Artists: string,
            Albums?: string,
            Songs?: string,
            Genres?: string,
            Created: string
        }
    ) {
        if (fields) Object.assign(this, fields);
    }
}

/*
export class Person {
    public name: string;
    public address: string;
    public age: number;

    public constructor(
        fields?: {
            name?: string,
            address?: string,
            age?: number
        }) {
        if (fields) Object.assign(this, fields);
    }
}
*/