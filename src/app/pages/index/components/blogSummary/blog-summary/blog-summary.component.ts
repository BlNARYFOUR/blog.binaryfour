import {Component, Input, OnInit} from '@angular/core';
import {environment} from "../../../../../../environments/environment";

@Component({
  selector: 'app-blog-summary',
  templateUrl: './blog-summary.component.html',
  styleUrls: ['./blog-summary.component.scss']
})
export class BlogSummaryComponent implements OnInit {

  @Input() blog: any;

  apiUrl: string = environment.apiUrl;

  constructor() { }

  ngOnInit() {
  }

}
