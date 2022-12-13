import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/shared/shared.module';
import { MoviesComponent } from './pages/movies/movies.component';
import { RouterModule } from '@angular/router';
import { MoviesRoutes } from './movies.routes';
import { AllMoviesComponent } from './pages/all-movies/all-movies.component';
import { TrailerCarouselComponent } from './components/trailer-carousel/trailer-carousel.component';



@NgModule({
  declarations: [
    MoviesComponent,
    AllMoviesComponent,
    TrailerCarouselComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(MoviesRoutes),

  ]
})
export class MoviesModule { }
