import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowsComponent } from './pages/shows/shows.component';
import { RouterModule } from '@angular/router';
import { ShowsRoutes } from './shows.routes';
import { SharedModule } from 'src/shared/shared.module';
import { AllShowsComponent } from './pages/all-shows/all-shows.component';



@NgModule({
  declarations: [
    ShowsComponent,
    AllShowsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(ShowsRoutes),
  ]
})
export class ShowsModule { }
