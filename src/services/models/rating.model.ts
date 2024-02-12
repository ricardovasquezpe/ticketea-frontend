export class Rating {
    public encId: string;
    public rating: number;
    public comment: string;

    constructor(encId: string, rating: number, comment: string){
        this.encId = encId;
        this.rating = rating;
        this.comment = comment;
    }
}