import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {IndexComponent} from "./pages/index/index.component";
import {BlogComponent} from "./pages/blog/blog.component";
import {CreateComponent} from "./pages/create/create.component";

const routes: Routes = [
    { path: '', component: IndexComponent },
    { path: 'blog/create', component: CreateComponent },
    { path: 'blog/:id', component: BlogComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled',onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
