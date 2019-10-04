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
    verifyActive: boolean = false;

    loginForm: FormGroup;
    registerForm: FormGroup;
    verifyForm: FormGroup;
    loginError: string;
    registerError: string;
    registerMessage: string;
    verifyError: string;
    verifyMessage: string;

    constructor(
        private _formBuilder: FormBuilder,
        private _authService: AuthService,
        private _route: ActivatedRoute) {
        let token = localStorage.getItem('ACCESS_TOKEN');

        AuthService.token = token;
        if(token != null) {
            AuthService.setLoggedIn(true);
            this.getLoggedInUser();
        }

        this.createForms();
        this._route.queryParams.subscribe(params => {
            console.log('params:', params['login']);
            this.loginActive = params['login'] != null;
            this.verifyActive = params['verify'] != null;

            if(this.verifyActive) {
                this.verifyForm.get('token').setValue(params['token']);
                console.log(this.verifyForm.get('token').value);
                this.verifyForm.markAsDirty();
            }

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

        this.verifyForm = this._formBuilder.group({
            token: ['', Validators.required]
        });
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

    toggleVerify() {
        this.verifyActive = !this.verifyActive;
        this.verifyForm.reset();
    }

    loginSubmit() {
        this.loginForm.markAsPending();

        this._authService.login(this.loginForm.value).subscribe({
            next: (data: any) => {
                this.loginForm.reset();
                this.loginError = 'You have been logged in!';
                console.log(data);
                AuthService.token = data.access_token;
                localStorage.setItem('ACCESS_TOKEN', data.access_token);
                this.getLoggedInUser();
                AuthService.setLoggedIn(true);
                this.loginActive = false;
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

    getLoggedInUser() {
        this._authService.getLoggedIn().subscribe({
            next: (data: any) => {
                console.log(data);
                AuthService.setUser(data.data);
            },
            error: (data: any) => {
                console.log(data);
            }
        });
    }

    registerSubmit() {
        this.registerForm.markAsPending();

        this._authService.register(this.registerForm.value).subscribe({
            next: (data: any) => {
                this.registerForm.reset();
                this.registerError = null;
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

    verifySubmit() {
        this.verifyForm.markAsPending();

        this._authService.verify(this.verifyForm.value).subscribe({
            next: (data: any) => {
                this.verifyForm.reset();
                this.verifyError = null;
                this.verifyMessage = data.message;
                console.log(data);
            },
            error: (data: any) => {
                this.verifyForm.reset();
                console.log(data.error.error);

                this.verifyMessage = null;

                if(data.error) {
                    this.verifyError = data.error.error ? data.error.error : 'Verification failed. Try again later.';
                }
            }
        });
    }
}
