import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BlogService} from "../../services/blog.service";
import {environment} from "../../../environments/environment";

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

  constructor(
      private _route: ActivatedRoute,
      private _blogService: BlogService
  ) { }

  ngOnInit() {
      this._route.paramMap.subscribe(params => {
          console.log(params);
          let id = parseInt(params.get('id'));

          this.showBlog(id);
          this.showOtherBlogs(id);
      });
  }

    showBlog(id: number) {
        this._blogService.getBlog(id).subscribe((data) => {
            this.blog = data['data'];
        });
    }

    static checkId(skipId: number, id: number) {
      return skipId != id;
    }

    showOtherBlogs(skipId: number) {
        this._blogService.getBlogs().subscribe((data) => {
            let buf = data['data'];

            this.blogs = buf.filter((blog) => {
                return BlogComponent.checkId(skipId, blog['id']);
            });
        });
    }

}
