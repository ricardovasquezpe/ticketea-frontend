export class Artist {
    public encId: string;
    public name: string;
    public image_url: string;

    constructor(encId: string, name: string, image_url: string){
        this.encId = encId;
        this.name = name;
        this.image_url = image_url;
    }
}