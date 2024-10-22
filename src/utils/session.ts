import { jwtDecode, JwtPayload } from "jwt-decode";

export default class Session {
    static JWTUSER_KEY = "jwt_user";
    static BANNERVISIBILITY_KEY = "banner_visibility";

    static getUserToken = () => {
        return localStorage.getItem(this.JWTUSER_KEY);
    }

    static saveUserToken = (val:any) => {
        localStorage.setItem(this.JWTUSER_KEY, val);
    }

    static clearUserToken = () => {
        localStorage.removeItem(this.JWTUSER_KEY);
    }

    static saveBannerVisibility = () => {
        localStorage.setItem(this.BANNERVISIBILITY_KEY, "0");
    }

    static getBannerVisibility = () => {
        var visibility = localStorage.getItem(this.BANNERVISIBILITY_KEY);
        if(!visibility) return true;
        return visibility == "1";
    }

    static isLoggedIn = ():boolean =>{
        var token = this.getUserToken();
        if (token == null){
            return false;
        }

        const decoded: JwtPayload = jwtDecode<JwtPayload>(token);
        const currentTime = Math.floor(Date.now() / 1000);
        const remainingTime = decoded.exp! - currentTime;
        if(remainingTime <= 0){
            return false;
        }

        return true;
    }
}