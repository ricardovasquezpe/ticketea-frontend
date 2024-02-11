import { Artist } from "./artist.model";

export class Event {
    public id: number;
    public title: string;
    public place: string;
    public image_url: string;
    public url: string;
    public date: number;
    public ticketsCount: number;
    public artist:Artist;

    constructor(id: number, title: string, place: string, image_url: string, url: string, date: number, ticketsCount: number, artist: Artist){
        this.id = id;
        this.title = title;
        this.place = place;
        this.image_url = image_url;
        this.url = url;
        this.date = date;
        this.ticketsCount = ticketsCount;
        this.artist = artist;
    }
}