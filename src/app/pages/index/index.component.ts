import { Component, OnInit } from '@angular/core';
import {BlogService} from "../../services/blog.service";
import {environment} from "../../../environments/environment";
import {split} from "ts-node";

@Component({
  selector: 'app-index',
    providers: [BlogService],
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

    apiUrl: string = environment.apiUrl;
    blogs: any;

    pageSize: number = 6;
    currentPage: number = 1;
    totalItems: number = 18;

  constructor(private _blogService: BlogService) { }

  ngOnInit() {
      this._blogService.enablePostAnimation();
      this.showBlogs(this.currentPage);
  }

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
