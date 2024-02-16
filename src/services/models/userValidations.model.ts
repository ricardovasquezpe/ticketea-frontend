export class UserValidations {
    public count: number;
    public type: number;
    public validated: boolean;

    constructor(count: number, type: number, validated: boolean){
        this.count = count;
        this.type = type;
        this.validated = validated;
    }
}