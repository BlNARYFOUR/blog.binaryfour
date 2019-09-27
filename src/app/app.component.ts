import {Component} from '@angular/core';
import {BlogService} from "./services/blog.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "./services/auth.service";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-root',
    providers: [BlogService, FormBuilder, AuthService],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    title = 'BinaryFour - Blog';
    loginActive: boolean = false;
    registerActive: boolean = false;

    loginForm: FormGroup;
    registerForm: FormGroup;
    loginError: string;
    registerError: string;
    private registerMessage: string;

    constructor(
        private _formBuilder: FormBuilder,
        private _blogService: BlogService,
        private _authService: AuthService,
        private _route: ActivatedRoute) {
        this.createForms();
        this._route.queryParams.subscribe(params => {
            console.log('params:', params['login']);
            this.loginActive = params['login'] != null;
        });
    }

    createForms() {
        this.loginForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });

        this.registerForm = this._formBuilder.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required]
        }, {validator: this.checkPasswords });
    }

    checkPasswords = (group: FormGroup) => {
        let pass = group.get('password').value;
        let confirmPass = group.get('confirmPassword').value;

        return pass === confirmPass ? null : { invalidConfirm: true }
    };

    toggleLogin() {
        this.loginActive = !this.loginActive;
    }

    toggleRegister() {
        this.registerActive = !this.registerActive;
    }

    loginSubmit() {
        this.loginForm.markAsPending();

        this._authService.login(this.loginForm.value).subscribe({
            next: (data: any) => {
                this.loginForm.reset();
                this.loginError = 'You have been logged in!';
                console.log(data);
            },
            error: (data: any) => {
                this.loginForm.reset();
                console.log(data.error.error);

                if(data.error) {
                    this.loginError = data.error.error ? data.error.error : 'Login failed. Try again later.';
                }
            }
        });
    }

    registerSubmit() {
        this.registerForm.markAsPending();

        this._authService.register(this.registerForm.value).subscribe({
            next: (data: any) => {
                this.registerForm.reset();
                this.registerMessage = data.message;
                console.log(data);
            },
            error: (data: any) => {
                this.registerForm.reset();
                console.log(data.error.error);

                this.registerMessage = null;

                if(data.error) {
                    this.registerError = data.error.error ? data.error.error : 'Register failed. Try again later.';
                }
            }
        });
    }
}
