export default class Session {

    static ISLOGGEGIN_KEY = "isLoggedIn";

    static getIsLoggedIn = () => {
        return localStorage.getItem(this.ISLOGGEGIN_KEY) == "true";
    }

    static setIsLoggedIn = (val:any) => {
        localStorage.setItem(this.ISLOGGEGIN_KEY, val);
    }
}