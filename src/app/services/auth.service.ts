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
    private getLoggedInUrl: string = environment.apiUrl + 'logged-in';

    public static token = null;
    public static isLoggedIn = false;
    public static loggedInObs = new BehaviorSubject(false);
    public static user = null;

    constructor(private _http: HttpClient) {
    }

    public static setLoggedIn(val) {
        AuthService.isLoggedIn = val;
        this.loggedInObs.next(val);
    }

    public static setUser(val) {
        this.user = val;
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
        AuthService.token = null;
    }

    public register(userInfo: any) {
        return this._http.post(this.registerUrl, userInfo);
    }

    public verify(verifyInfo: any) {
        return this._http.post(this.verifyUrl, verifyInfo);
    }
}