import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { RootLayoutComponent } from './pages/root-layout/root-layout.component';
import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
} from '@angular/fire/compat/auth-guard';
import { BrowseComponent } from './sidebar-data/browse/browse.component';
import { BookmarksComponent } from './sidebar-data/bookmarks/bookmarks.component';
import { SettingsComponent } from './sidebar-data/settings/settings.component';
import { EmailHandlerComponent } from './pages/email-handler/email-handler.component';
import { ItemDetailsComponent } from 'src/app/pages/item-details/item-details.component';
import { CastDetailsComponent } from './pages/cast-details/cast-details.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { GenreComponent } from './pages/genre/genre.component';
import { RecentComponent } from './sidebar-data/recent/recent.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/login']);

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'ngmovies',
    component: RootLayoutComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
    children: [
      {
        path: 'movies',
        loadChildren: () =>
          import('../movies/movies.module').then((m) => m.MoviesModule),
      },
      {
        path: 'tvshows',
        loadChildren: () =>
          import('../shows/shows.module').then((m) => m.ShowsModule),
      },
      {
        path: 'animations',
        loadChildren: () =>
          import('../animations/animations.module').then(
            (m) => m.AnimationsModule
          ),
      },
      {
        path:'genre/:genre',
        component:GenreComponent,
        pathMatch:'full'
      },
      {
        path: 'settings',
        component: SettingsComponent,
        pathMatch: 'full',
      },
      {
        path: 'browse',
        component: BrowseComponent,
        pathMatch: 'full',
      },
      {
        path: 'bookmarked',
        component: BookmarksComponent,
        pathMatch: 'full',
      },
      {
        path: 'cast/:ids/:name',
        component: CastDetailsComponent,
        pathMatch: 'full',
      },
      {
        path: ':media_type/:id',
        component: ItemDetailsComponent,
        pathMatch: 'full',
      },
      {
        path:'recent',
        component:RecentComponent,
        pathMatch:'full'
      }
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: 'register',
    component: RegisterComponent,
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    pathMatch: 'full',
  },
  {
    path: 'email-handler',
    component: EmailHandlerComponent,
    pathMatch: 'full',
  },
  {
    path: '**',
    component: NotFoundComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
