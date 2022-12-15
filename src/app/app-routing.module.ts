import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { RootLayoutComponent } from './pages/root-layout/root-layout.component';
import { AngularFireAuthGuard, canActivate, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';
import { SettingsComponent } from './pages/settings/settings.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/login']);

const routes: Routes = [
  {
    path:'',
    redirectTo:'home',
    pathMatch:'full',    
  },
  {
    path:'ngmovies',
    component:RootLayoutComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
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
      },
      {
        path:'settings',
        component:SettingsComponent,
        pathMatch:'full',
      },
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
  {
    path:'forgot-password',
    component:ForgotPasswordComponent,
    pathMatch:'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

