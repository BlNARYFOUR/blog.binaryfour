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
    newTagForm: FormGroup;
    tags: any;
    newTagActive: boolean;
    selectedFile: any;

    constructor(private _formBuilder: FormBuilder,
                private _router: Router,
                private _authService: AuthService,
                private _titleService: Title,
                private _blogService: BlogService,) {
        this.createForms();
    }

    createForms() {
        this.postForm = this._formBuilder.group({
            date: ['', [Validators.required]],
            location: ['', [Validators.required]],
            duration: ['', [Validators.required]],
            goal_audience: ['', [Validators.required]],
            title: ['', [Validators.required]],
            body: ['', [Validators.required]],
            wallpaper_buf: ['', [Validators.required]],
            tag: ['', []],
        });

        this.newTagForm = this._formBuilder.group({
            name: ['', [Validators.required]],
        });
    }

    ngOnInit() {
        this.showTags();
        this._titleService.setTitle('BinaryFour - Create Post');

        if (!this.isLoggedIn()) {
            this._router.navigateByUrl('/');
        }
    }

    toggleNewTag() {
        this.newTagActive = !this.newTagActive;
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

    newTagSubmit() {
        this.newTagForm.markAsPending();

        this._blogService.createTag(this.newTagForm.value).subscribe({
            next: (data: any) => {
                this.newTagForm.reset();
                //this.newTagError = 'You have been logged in!';
                console.log(data.data);

                this.newTagActive = false;
            },
            error: (data: any) => {
                this.newTagForm.reset();
                console.log(data.error.error);

                if(data.error) {
                    // this.newTagError = data.error.error ? data.error.error : 'Creating tag failed. Try again later.';
                }
            }
        });
    }

    createBlogSubmit() {
        this.postForm.markAsPending();

        let data = this.postForm.value;

        data['image'] = this.selectedFile.file;

        console.log(data);

        this._blogService.createBlog(data).subscribe({
            next: (data: any) => {
                this.postForm.reset();
                //this.newTagError = 'You have been logged in!';
                console.log(data.data);

                this.newTagActive = false;
            },
            error: (data: any) => {
                console.log(data.error.error);
                this.postForm.markAsUntouched();
                if(data.error) {
                    // this.newTagError = data.error.error ? data.error.error : 'Creating blog failed. Try again later.';
                }
            }
        });
    }

    showNewTag() {
        console.log("ADD NEW TAG");
        this.newTagActive = true;
    }

    processFile(imageInput: any) {
        class ImageSnippet {
            constructor(public src: string, public file: File) {}
        }

        const file: File = imageInput.files[0];
        const reader = new FileReader();

        reader.addEventListener('load', (event: any) => {
            this.selectedFile = new ImageSnippet(event.target.result, file);
        });

        reader.readAsDataURL(file);
    }
}
