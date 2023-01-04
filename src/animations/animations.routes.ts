import { Routes } from "@angular/router";
import { AllAnimationsShowsComponent } from "./pages/all-animations-shows/all-animations-shows.component";
import { AllAnimationsComponent } from "./pages/all-animations/all-animations.component";
import { AnimationsComponent } from "./pages/animations/animations.component";

export const AnimationsRoutes: Routes = [
    {
        path:'',
        pathMatch:'full',
        redirectTo:'home'
    },
    {
        path:'home',
        pathMatch:'full',
        component:AnimationsComponent
    },
    {
        path:'all-animations',
        pathMatch:'full',
        component:AllAnimationsComponent
    },
    {
        path:'all-animations-shows',
        pathMatch:'full',
        component:AllAnimationsShowsComponent
    }
]