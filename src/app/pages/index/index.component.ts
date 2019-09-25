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

  constructor(private _blogService: BlogService) { }

  ngOnInit() {
      this.showBlogs();
  }

  showBlogs() {
      this._blogService.getBlogs().subscribe((data) => {
          this.blogs = data['data'];
          console.log(this.blogs)
      });
  }

}
