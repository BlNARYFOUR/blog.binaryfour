import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {AuthService} from "./auth.service";

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

    createBlog(blogInfo: any) {
        console.log("blogInfo:", blogInfo);

        let formData = new FormData();
        formData.append('body', blogInfo['body']);
        formData.append('image', blogInfo["image"]);
        formData.append('date', blogInfo['date']);
        formData.append('duration', blogInfo['duration']);
        formData.append('goal_audience', blogInfo['goal_audience']);
        formData.append('location', blogInfo['location']);
        formData.append('tag', blogInfo['tag']);
        formData.append('title', blogInfo['title']);

        console.log("formData:", formData);

        return this._http.post<any>(this.blogsUrl, formData, {
            headers: {
                'Authorization': 'Bearer ' + AuthService.token
            }
        });
    }

    createTag(tagInfo: any) {
        return this._http.post(this.tagsUrl, tagInfo, {
            headers: {'Authorization': 'Bearer ' + AuthService.token}
        });
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
