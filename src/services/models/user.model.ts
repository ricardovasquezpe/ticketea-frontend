export class User {
    public encId: string;
    public name: string;
    public email: string;
    public last_name_father: string;
    public last_name_mother: string;
    public profile_photo_url: string;
    public birth_date: string;

    constructor(encId: string, name: string, email: string, last_name_father: string, last_name_mother: string, profile_photo_url: string, birth_date: string){
        this.encId = encId;
        this.name = name;
        this.email = email;
        this.last_name_father = last_name_father;
        this.last_name_mother = last_name_mother;
        this.profile_photo_url = profile_photo_url;
        this.birth_date = birth_date;
    }
}