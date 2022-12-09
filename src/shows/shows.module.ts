import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowsComponent } from './pages/shows/shows.component';
import { RouterModule } from '@angular/router';
import { ShowsRoutes } from './shows.routes';
import { SharedModule } from 'src/shared/shared.module';



@NgModule({
  declarations: [
    ShowsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(ShowsRoutes),
  ]
})
export class ShowsModule { }
