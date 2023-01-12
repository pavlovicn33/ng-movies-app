import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RootLayoutComponent } from './pages/root-layout/root-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { SharedModule } from 'src/shared/shared.module';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NgxSplideModule } from 'ngx-splide';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { provideFunctions, getFunctions } from '@angular/fire/functions';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from 'src/shared/interceptors/auth.interceptor';
import { BrowseComponent } from './sidebar-data/browse/browse.component';
import { BookmarksComponent } from './sidebar-data/bookmarks/bookmarks.component';
import { RecentComponent } from './sidebar-data/recent/recent.component';
import { SettingsComponent } from './sidebar-data/settings/settings.component';
import { PasswordDialogComponent } from './components/password-dialog/password-dialog.component';
import { EmailHandlerComponent } from './pages/email-handler/email-handler.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { RecoverEmailComponent } from './components/recover-email/recover-email.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { PersonItemComponent } from './components/person-item/person-item.component';
import { ItemDetailsComponent } from './pages/item-details/item-details.component';
import { MovieTvItemComponent } from './components/movie-tv-item/movie-tv-item.component';
import { MovieTrailerDialogComponent } from './components/movie-trailer-dialog/movie-trailer-dialog.component';
import { CastDetailsComponent } from './pages/cast-details/cast-details.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { GenreComponent } from './pages/genre/genre.component';
import { DiscoverComponent } from './sidebar-data/discover/discover.component';
import { MatSelectCountryModule } from '@angular-material-extensions/select-country';
import { ErrorHandlerService } from 'src/shared/services/error/error-handler.service';
import { ErrorHandler } from '@angular/core';
import { HelpPageComponent } from './sidebar-data/help-page/help-page.component';
@NgModule({
  declarations: [
    AppComponent,
    RootLayoutComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    FooterComponent,
    NavBarComponent,
    SettingsComponent,
    ForgotPasswordComponent,
    BrowseComponent,
    BookmarksComponent,
    RecentComponent,
    PasswordDialogComponent,
    EmailHandlerComponent,
    ResetPasswordComponent,
    RecoverEmailComponent,
    VerifyEmailComponent,
    PersonItemComponent,
    ItemDetailsComponent,
    MovieTvItemComponent,
    MovieTrailerDialogComponent,
    CastDetailsComponent,
    NotFoundComponent,
    GenreComponent,
    DiscoverComponent,
    HelpPageComponent,
  ],
  imports: [
    MatSelectCountryModule.forRoot('en'),
    InfiniteScrollModule,
    BrowserModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgxSplideModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),
    provideStorage(() => getStorage()),
  ],
  providers: [
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: ErrorHandler, useClass: ErrorHandlerService },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
