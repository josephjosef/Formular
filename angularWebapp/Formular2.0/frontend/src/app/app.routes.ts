import { Routes } from '@angular/router';
import { App } from './app';
import { DetailsPage } from './details-page/details-page';

export const routes: Routes = [{
    path:"",
    component: App,
    title: "Home Page"
},
{
    path: "details/:id",
    component: DetailsPage,
    title: "Details Page"
}];
