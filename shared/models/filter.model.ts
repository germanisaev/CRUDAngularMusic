export class PlaylistFilter {

    public Id: number;
    public UserId: number;
    public Artists: boolean;
    public Albums: boolean;
    public Songs: boolean;
    public Genres: boolean;
    public Created: boolean;
    public Updated: string;

    constructor(
        fields?: {
            Id?: number,
            UserId: number,
            Artists?: boolean,
            Albums?: boolean,
            Songs?: boolean,
            Genres?: boolean,
            Created?: boolean,
            Updated?: string
        }
    ) {
        if (fields) Object.assign(this, fields);
    }
}