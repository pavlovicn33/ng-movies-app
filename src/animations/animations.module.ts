import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimationsComponent } from './pages/animations/animations.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/shared/shared.module';
import { AllAnimationsComponent } from './pages/all-animations/all-animations.component';
import { AllAnimationsShowsComponent } from './pages/all-animations-shows/all-animations-shows.component';
import { AnimationMoviesComponent } from './components/animation-movies/animation-movies.component';
import { AnimationShowsComponent } from './components/animation-shows/animation-shows.component';
import { AnimationsRoutes } from './animations.routes';



@NgModule({
  declarations: [
    AnimationsComponent,
    AllAnimationsComponent,
    AllAnimationsShowsComponent,
    AnimationMoviesComponent,
    AnimationShowsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(AnimationsRoutes),

  ]
})
export class AnimationsModule { }
