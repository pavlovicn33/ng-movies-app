import { Routes } from "@angular/router";
import { AllMoviesComponent } from "./pages/all-movies/all-movies.component";
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
    },
    {
        path:'all-movies',
        pathMatch:'full',
        component:AllMoviesComponent
    }
]