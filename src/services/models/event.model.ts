import { Artist } from "./artist.model";

export class Event {
    public encId: string;
    public title: string;
    public place: string;
    public image_url: string;
    public url: string;
    public date: number;
    public artist:Artist;
    public ticketsCount: number;

    constructor(encId: string, title: string, place: string, image_url: string, url: string, date: number, artist: Artist, ticketsCount: number){
        this.encId = encId;
        this.title = title;
        this.place = place;
        this.image_url = image_url;
        this.url = url;
        this.date = date;
        this.artist = artist;
        this.ticketsCount = ticketsCount;
    }
}