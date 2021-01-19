export class Song {

    public Id: number;
    public Name: string;
    public Photo: string;
    public Song: string;
    public Album: number;
    public Created: string;
    public MusicFile: string;

    constructor(
        fields?: {
            Id?: number,
            Name?: string,
            Photo?: string,
            Song?: string,
            Album?: number,
            Created?: string,
            MusicFile?: string
        }) {

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

