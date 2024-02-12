export class Zone {
    public encId: string;
    public name: string;
    public price: number;

    constructor(encId: string, name: string, price: number){
        this.encId = encId;
        this.name = name;
        this.price = price;
    }
}