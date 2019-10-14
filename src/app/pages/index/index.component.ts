import {Component, OnInit} from '@angular/core';
import {BlogService} from "../../services/blog.service";
import {environment} from "../../../environments/environment";
import {split} from "ts-node";
import {AuthService} from "../../services/auth.service";
import {Title} from "@angular/platform-browser";
import {FormBuilder, FormGroup} from "@angular/forms";

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

    filterForm: FormGroup;
    tags: any;

    constructor(private _formBuilder: FormBuilder,
                private _blogService: BlogService,
                private _authService: AuthService,
                private _titleService: Title) {
        this.filterForm = this._formBuilder.group({
            tagId: ['']
        });
    }

    ngOnInit() {
        this.showTags();
        this._titleService.setTitle('BinaryFour - Blog');
        this.token = localStorage.getItem('ACCESS_TOKEN');
        this._blogService.enablePostAnimation();

        this.onChanges();
    }

    onChanges() {
        AuthService.changes.subscribe(value => {
            if (value == AuthService.getChangeIDs().SET_LOGGED_IN) {
                this.showBlogs(this.filterForm.get('tagId').value, this.currentPage, this.getPageSize());
                console.log("CHANGED: Subscribe", value);
            }
        });

        this.filterForm.valueChanges.subscribe(val => {
            console.log("CHANGEZZ:", val.tagId);
            this.showBlogs(val.tagId, this.currentPage, this.getPageSize());
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

    showBlogs(tagId, page, size) {
        this._blogService.getBlogs(tagId, page, size).subscribe((data) => {
            this.blogs = data['data'];
            this.totalItems = data['meta']['total'];
            console.log(data);
        });
    }

    showTags() {
        this._blogService.getTags().subscribe((data) => {
            this.tags = data['data'];
        });
    }

    pageChanged($page) {
        this.currentPage = $page;
        this.showBlogs(this.filterForm.get('tagId').value, $page, this.getPageSize());
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
