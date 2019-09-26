import {Component} from '@angular/core';
import {BlogService} from "./services/blog.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "./services/auth.service";

@Component({
    selector: 'app-root',
    providers: [BlogService, FormBuilder, AuthService],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    title = 'blog-binaryfour';
    loginActive: boolean = false;

    loginForm: FormGroup;

    constructor(private _formBuilder: FormBuilder, private _blogService: BlogService, private _authService: AuthService) {
        this.createForms();
    }

    formControls() { return this.loginForm.controls; }

    createForms() {
        this.loginForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

    toggleLogin() {
        this.loginActive = !this.loginActive;
    }

    loginSubmit() {
        console.log(this.loginForm.value);
        this._authService.login(this.loginForm.value).subscribe((data) => {
            console.log(data);
        });
    }
}
