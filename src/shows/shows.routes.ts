import { Routes } from "@angular/router";
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
    }
]