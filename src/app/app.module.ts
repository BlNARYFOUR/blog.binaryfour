import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './pages/index/index.component';
import {HttpClientModule} from "@angular/common/http";
import { BlogSummaryComponent } from './pages/index/components/blogSummary/blog-summary/blog-summary.component';
import {AnimateOnScrollModule} from "ng2-animate-on-scroll";
import { BlogComponent } from './pages/blog/blog.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    BlogSummaryComponent,
    BlogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
      HttpClientModule,
      AnimateOnScrollModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
