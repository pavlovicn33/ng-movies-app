import { Routes } from "@angular/router";
import { MoviesComponent } from "./pages/movies/movies.component";

export const MoviesRoutes: Routes = [
    {
        path:'',
        pathMatch:'full',
        redirectTo:'home'
    },
    {
        path:'home',
        pathMatch:'full',
        component:MoviesComponent
    }
]