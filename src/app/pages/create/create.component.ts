import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create',
  providers: [AuthService],
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  constructor(private _router: Router,
              private _authService: AuthService) { }

  ngOnInit() {
      if (!this.isLoggedIn()) {
          this._router.navigateByUrl('/');
      }
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
}
