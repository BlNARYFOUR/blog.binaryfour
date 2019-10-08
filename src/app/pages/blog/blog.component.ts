import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BlogService} from "../../services/blog.service";
import {environment} from "../../../environments/environment";
import {animate} from "@angular/animations";
import {Title} from "@angular/platform-browser";
import {AuthService} from "../../services/auth.service";

@Component({
    selector: 'app-blog',
    providers: [AuthService, BlogService],
    templateUrl: './blog.component.html',
    styleUrls: ['./blog.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class BlogComponent implements OnInit {

    apiUrl: string = environment.apiUrl;
    blog: any;
    blogs: any;
    animate: boolean;
    prev: any;
    next: any;

    constructor(private _router: Router,
                private _route: ActivatedRoute,
                private _authService: AuthService,
                private _blogService: BlogService,
                private _titleService: Title) {
    }

    ngOnInit() {
        this.animate = this._blogService.doPostAnimation();
        this._blogService.disablePostAnimation();

        this._route.paramMap.subscribe(params => {
            let id = parseInt(params.get('id'));

            this.showBlog(id);
            this.showOtherLatestBlogs(id);
        });
    }

    isLoggedIn = () => {
        return AuthService.isLoggedIn;
    };

    getUser = () => {
        return AuthService.user;
    };

    showBlog(id: number) {
        this._blogService.getBlog(id).subscribe((data) => {
            this.blog = data['current'];
            this.next = data['next'];
            this.prev = data['previous'];

            this._titleService.setTitle('BinaryFour - ' + this.blog.title);
            //console.log(data)
        });
    }

    showOtherLatestBlogs(skipId: number) {
        this._blogService.getLatestBlogs(skipId).subscribe((data) => {
            this.blogs = data['data'];
        });
    }

    gotoUpdateForm() {
        this._router.navigateByUrl('/');
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
