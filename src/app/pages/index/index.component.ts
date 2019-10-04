import { Component, OnInit } from '@angular/core';
import {BlogService} from "../../services/blog.service";
import {environment} from "../../../environments/environment";
import {split} from "ts-node";
import {AuthService} from "../../services/auth.service";

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

  constructor(private _blogService: BlogService) {}

  ngOnInit() {
      this.token = localStorage.getItem('ACCESS_TOKEN');
      this._blogService.enablePostAnimation();
      this.showBlogs(this.currentPage);
  }

  isLoggedIn = () => {
      return AuthService.isLoggedIn;
  };

  getUser = () => {
      return AuthService.user;
  };

  showBlogs(page) {
      this._blogService.getBlogs(page).subscribe((data) => {
          this.blogs = data['data'];
          this.totalItems = data['meta']['total'];
          console.log(data);
      });
  }

  pageChanged($page) {
      this.currentPage = $page;
      this.showBlogs($page);
  }

}
