import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Title} from "@angular/platform-browser";
import {BlogService} from "../../services/blog.service";

@Component({
    selector: 'app-create',
    providers: [AuthService, BlogService],
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

    postForm: FormGroup;
    tags: any;

    constructor(private _formBuilder: FormBuilder,
                private _router: Router,
                private _authService: AuthService,
                private _titleService: Title,
                private _blogService: BlogService) {
        this.createForms();
    }

    createForms() {
        this.postForm = this._formBuilder.group({
            date: ['', [Validators.required]],
            location: ['', [Validators.required]],
            duration: ['', [Validators.required]],
            tag: ['', [Validators.required]],
        });
    }

    ngOnInit() {
        this.showTags();
        this._titleService.setTitle('BinaryFour - Create Post');

        if (!this.isLoggedIn()) {
            this._router.navigateByUrl('/');
        }
    }

    showTags() {
        this._blogService.getTags().subscribe((data) => {
            this.tags = data['data'];
        });
    }

    isLoggedIn = () => {
        return AuthService.isLoggedIn;
    };

    getUser = () => {
        return AuthService.user;
    };

    logoutSubmit() {
        this._authService.logout().subscribe({
            next: (data: any) => {
                // this.logoutMessage = 'You have been logged in!';
                console.log(data);
                AuthService.clientLogout();
                this._router.navigateByUrl('/');
            },
            error: (data: any) => {
                console.log(data.error.error);

                if (data.error) {
                    // this.logoutError = data.error.error ? data.error.error : 'Login failed. Try again later.';
                }
            }
        });
    }

    showNewTag() {

    }
}
