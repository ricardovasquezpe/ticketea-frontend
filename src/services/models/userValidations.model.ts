import { UserValidationType } from "../../utils/enums/userValidationType.enum";

export class UserValidations {
    public count: number;
    public type: UserValidationType;
    public validated: boolean;
    public manualValidation: boolean;

    constructor(count: number, type: number, validated: boolean, manualValidation: boolean){
        this.count = count;
        this.type = type;
        this.validated = validated;
        this.manualValidation = manualValidation;
    }
}