import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimationsComponent } from './pages/animations/animations.component';
import { AnimationsRoutes } from './pages/animations.routes';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/shared/shared.module';



@NgModule({
  declarations: [
    AnimationsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(AnimationsRoutes),

  ]
})
export class AnimationsModule { }
