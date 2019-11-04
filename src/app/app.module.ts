import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './pages/index/index.component';
import {HttpClientModule} from "@angular/common/http";
import { BlogSummaryComponent } from './pages/index/components/blogSummary/blog-summary/blog-summary.component';
import {AnimateOnScrollModule} from "ng2-animate-on-scroll";
import { BlogComponent } from './pages/blog/blog.component';
import {NgxPaginationModule} from "ngx-pagination";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CreateComponent } from './pages/create/create.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    BlogSummaryComponent,
    BlogComponent,
    CreateComponent
  ],
  imports: [
    BrowserModule,
      FormsModule,
      ReactiveFormsModule,
    AppRoutingModule,
      HttpClientModule,
      AnimateOnScrollModule.forRoot(),
      NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
