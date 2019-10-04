import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable()
export class BlogService {

    doAnimation: boolean = false;

    constructor(private _http: HttpClient) {

    }

    blogsUrl = environment.apiUrl + 'blogs';
    latestBlogsUrl = environment.apiUrl + 'blogs/latest/';
    blogUrl = environment.apiUrl + 'blogs/';

    getBlogs(page: number, size: number) {
        return this._http.get(this.blogsUrl + '?page=' + page + '&size=' + size);
    }

    getLatestBlogs(skipId: number) {
        return this._http.get(this.latestBlogsUrl + skipId);
    }

    getBlog(id: number) {
        return this._http.get(this.blogUrl + id);
    }

    enablePostAnimation() {
        this.doAnimation = true;
    }

    disablePostAnimation() {
        this.doAnimation = false;
    }

    doPostAnimation() {
        return this.doAnimation;
    }
}
