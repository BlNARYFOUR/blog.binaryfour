import {Component, OnInit} from '@angular/core';
import {BlogService} from "../../services/blog.service";
import {environment} from "../../../environments/environment";
import {split} from "ts-node";
import {AuthService} from "../../services/auth.service";
import {Title} from "@angular/platform-browser";

@Component({
    selector: 'app-index',
    providers: [BlogService, AuthService],
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

    apiUrl: string = environment.apiUrl;
    blogs: any;

    pageSize: number = 6;
    currentPage: number = 1;
    totalItems: number = 0;

    token: string;

    constructor(private _blogService: BlogService,
                private _authService: AuthService,
                private _titleService: Title) {
    }

    ngOnInit() {
        this._titleService.setTitle('BinaryFour - Blog');
        this.token = localStorage.getItem('ACCESS_TOKEN');
        this._blogService.enablePostAnimation();

        AuthService.changes.subscribe(value => {
            if (value == AuthService.getChangeIDs().SET_LOGGED_IN) {
                this.showBlogs(this.currentPage, this.getPageSize());
                console.log("CHANGED: Subscribe", value);
            }
        });
    }

    isLoggedIn = () => {
        return AuthService.isLoggedIn;
    };

    getPageSize = () => {
        return this.isLoggedIn() ? this.pageSize - 1 : this.pageSize;
    };

    getUser = () => {
        return AuthService.user;
    };

    showBlogs(page, size) {
        this._blogService.getBlogs(page, size).subscribe((data) => {
            this.blogs = data['data'];
            this.totalItems = data['meta']['total'];
            console.log(data);
        });
    }

    pageChanged($page) {
        this.currentPage = $page;
        this.showBlogs($page, this.getPageSize());
        console.log("CHANGED: pageChanged");
    }

    logoutSubmit() {
        this._authService.logout().subscribe({
            next: (data: any) => {
                // this.logoutMessage = 'You have been logged in!';
                console.log(data);
                AuthService.clientLogout();
            },
            error: (data: any) => {
                console.log(data.error.error);

                if (data.error) {
                    // this.logoutError = data.error.error ? data.error.error : 'Login failed. Try again later.';
                }
            }
        });
    }
}
