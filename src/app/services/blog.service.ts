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
    tagsUrl = environment.apiUrl + 'blogs/tags';

    getBlogs(tagId: number, page: number, size: number) {
        return this._http.get(this.blogsUrl + '?page=' + page + '&size=' + size + '&tag=' + tagId);
    }

    getLatestBlogs(skipId: number) {
        return this._http.get(this.latestBlogsUrl + skipId);
    }

    getBlog(id: number) {
        return this._http.get(this.blogUrl + id);
    }

    getTags() {
        return this._http.get(this.tagsUrl);
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
