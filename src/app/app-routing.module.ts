import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { RootLayoutComponent } from './pages/root-layout/root-layout.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'ngmovies/movies',
    pathMatch:'full'
  },
  {
    path:'ngmovies',
    component:RootLayoutComponent,
    children:[
      {
        path:'movies',
        loadChildren:() =>
          import('../movies/movies.module').then((m) => m.MoviesModule)
      },
      {
        path:'tvshows',
        loadChildren:() =>
          import('../shows/shows.module').then((m) => m.ShowsModule)
      },
      {
        path:'animations',
        loadChildren:() =>
          import('../animations/animations.module').then((m) => m.AnimationsModule)
      }
    ]
  },
  {
    path:'login',
    component:LoginComponent,
    pathMatch:'full',
  },
  {
    path:'register',
    component:RegisterComponent,
    pathMatch:'full',
  },
  {
    path:'home',
    component:HomeComponent,
    pathMatch:'full',
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

