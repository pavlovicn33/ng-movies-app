import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/shared/shared.module';
import { MoviesComponent } from './pages/movies/movies.component';
import { RouterModule } from '@angular/router';
import { MoviesRoutes } from './movies.routes';



@NgModule({
  declarations: [
    MoviesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(MoviesRoutes),

  ]
})
export class MoviesModule { }
