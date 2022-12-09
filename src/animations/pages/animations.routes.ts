import { Routes } from "@angular/router";
import { AnimationsComponent } from "./animations/animations.component";

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
    }
]