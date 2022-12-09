import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimationsComponent } from './pages/animations/animations.component';
import { AnimationsRoutes } from './pages/animations.routes';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    AnimationsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(AnimationsRoutes),

  ]
})
export class AnimationsModule { }
