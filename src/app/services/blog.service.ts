import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable()
export class BlogService {

  constructor(private _http: HttpClient) {

  }

  blogsUrl = environment.apiUrl + 'blogs';
  blogUrl = environment.apiUrl + 'blogs/';

  getBlogs() {
      return this._http.get(this.blogsUrl);
  }

  getBlog(id: number) {
      return this._http.get(this.blogUrl + id);
  }
}
