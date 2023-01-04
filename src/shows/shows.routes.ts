import { Routes } from "@angular/router";
import { AllShowsComponent } from "./pages/all-shows/all-shows.component";
import { ShowsComponent } from "./pages/shows/shows.component";

export const ShowsRoutes: Routes = [
    {
        path:'',
        pathMatch:'full',
        redirectTo:'home'
    },
    {
        path:'home',
        pathMatch:'full',
        component:ShowsComponent
    },
    {
        path:'all-shows',
        pathMatch:'full',
        component:AllShowsComponent,
    },
]