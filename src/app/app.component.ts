import { Component } from '@angular/core';
import {BlogService} from "./services/blog.service";

@Component({
  selector: 'app-root',
    providers: [BlogService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'blog-binaryfour';
  loginActive: boolean = false;

    constructor(
        private _blogService: BlogService
    ) { }

    toggleLogin() {
        this.loginActive = !this.loginActive;
    }
}
