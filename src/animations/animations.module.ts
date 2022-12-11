import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimationsComponent } from './pages/animations/animations.component';
import { AnimationsRoutes } from './pages/animations.routes';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/shared/shared.module';
import { AllAnimationsComponent } from './pages/all-animations/all-animations.component';
import { AllAnimationsShowsComponent } from './pages/all-animations-shows/all-animations-shows.component';



@NgModule({
  declarations: [
    AnimationsComponent,
    AllAnimationsComponent,
    AllAnimationsShowsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(AnimationsRoutes),

  ]
})
export class AnimationsModule { }
