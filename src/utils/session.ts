export default class Session {

    static JWTUSER_KEY = "jwt_user";

    static getUserToken = () => {
        return localStorage.getItem(this.JWTUSER_KEY);
    }

    static saveUserToken = (val:any) => {
        localStorage.setItem(this.JWTUSER_KEY, val);
    }
}