import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {BehaviorSubject} from "rxjs/index";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private loginUrl: string = environment.apiUrl + 'login';
    private registerUrl: string = environment.apiUrl + 'register';
    private verifyUrl: string = environment.apiUrl + 'verify';
    private logoutUrl: string = environment.apiUrl + 'logout';
    private getLoggedInUrl: string = environment.apiUrl + 'logged-in';

    public static token = null;
    public static isLoggedIn = false;
    public static user = null;
    public static changes = new BehaviorSubject(null);

    constructor(private _http: HttpClient) {
    }

    public static getChangeIDs() {
        return {
            INIT: null,
            SET_LOGGED_IN: 0,
            SET_USER: 1
        }
    }

    public static markChanged(id) {
        console.log("CHANGED: markChanged");
        AuthService.changes.next(id);
    }

    public static setLoggedIn(val) {
        AuthService.isLoggedIn = val;
        console.log("CHANGED: setLoggedIn");
        AuthService.markChanged(AuthService.getChangeIDs().SET_LOGGED_IN);
    }

    public static setUser(val) {
        this.user = val;
        AuthService.markChanged(AuthService.getChangeIDs().SET_USER);
        console.log("CHANGED: setUser");
    }

    public login(userInfo: any) {
        return this._http.post(this.loginUrl, userInfo);
    }

    public getLoggedIn() {
        return this._http.get(this.getLoggedInUrl, {
            headers: {'Authorization': 'Bearer ' + AuthService.token}
        });
    }

    public logout() {
        return this._http.post(this.logoutUrl, {}, {
            headers: {'Authorization': 'Bearer ' + AuthService.token}
        });
    }

    public static clientLogout() {
        localStorage.removeItem('ACCESS_TOKEN');
        AuthService.token = null;
        AuthService.setLoggedIn(false);
    }

    public register(userInfo: any) {
        return this._http.post(this.registerUrl, userInfo);
    }

    public verify(verifyInfo: any) {
        return this._http.post(this.verifyUrl, verifyInfo);
    }
}