import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BlogService} from "../../services/blog.service";
import {environment} from "../../../environments/environment";
import {animate} from "@angular/animations";

@Component({
  selector: 'app-blog',
    providers: [BlogService],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

    apiUrl: string = environment.apiUrl;
    blog: any;
    blogs: any;
    animate: boolean;

  constructor(
      private _route: ActivatedRoute,
      private _blogService: BlogService
  ) { }

  ngOnInit() {
      this.animate = this._blogService.doPostAnimation();
      this._blogService.disablePostAnimation();

      this._route.paramMap.subscribe(params => {
          let id = parseInt(params.get('id'));

          this.showBlog(id);
          this.showOtherLatestBlogs(id);
      });
  }

    showBlog(id: number) {
        this._blogService.getBlog(id).subscribe((data) => {
            this.blog = data['data'];
        });
    }

    showOtherLatestBlogs(skipId: number) {
        this._blogService.getLatestBlogs(skipId).subscribe((data) => {
            this.blogs = data['data'];
        });
    }

}
