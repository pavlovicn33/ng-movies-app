import { DOCUMENT } from '@angular/common';
import {
  Component,
  EventEmitter,
  Inject,
  OnInit,
  Output,
  Renderer2,
} from '@angular/core';
import { AuthService } from 'src/shared/services/auth/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getAuth } from 'firebase/auth';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { SpinnerService } from 'src/shared/services/spinner/spinner.service';
import { User } from 'src/shared/models/user';
import * as functions from 'firebase-functions';
import * as firebase from 'firebase-admin';
import { doc, onSnapshot } from 'firebase/firestore';

@Component({
  selector: 'app-root-layout',
  templateUrl: './root-layout.component.html',
  styleUrls: ['./root-layout.component.scss'],
})
export class RootLayoutComponent implements OnInit {
  labelPosition: string | null = 'dark';
  menuItems: any;
  libraryItems: any;
  miscItems: any;
  logoutItem: any;
  links: any;
  mediaService: any;
  genres: any;
  showFiller = false;
  user: User;

  constructor(
    private authService: AuthService,
    @Inject(DOCUMENT) private document: Document,
    private render: Renderer2,
    private db: AngularFirestore,
    private router: Router,
    private spinnerService: SpinnerService
  ) {
    this.menuItems = [
      {
        icon: 'home',
        title: 'Home',
        link: 'movies',
      },
      {
        icon: 'search',
        title: 'Browse',
        link: 'browse',
      },
      {
        icon: 'people',
        title: 'Community',
      },
      {
        icon: 'alarm',
        title: 'Coming soon',
      },
    ];
    this.libraryItems = [
      {
        icon: 'access_time',
        title: 'Recent',
      },
      {
        icon: 'bookmark_border',
        title: 'Bookmarked',
        link: 'bookmarked',
      },
      {
        icon: 'star_border',
        title: 'Top Rated',
      },
      {
        icon: 'cloud_download',
        title: 'Downloaded',
      },
    ];
    this.miscItems = [
      {
        icon: 'settings',
        title: 'Settings',
        link: 'settings',
      },
      {
        icon: 'help_outline',
        title: 'Help',
      },
    ];
    this.logoutItem = [
      {
        icon: 'exit_to_app',
        title: 'Logout',
      },
    ];
    this.links = [
      {
        name: 'Movies',
        link: 'movies',
      },
      {
        name: 'TV Shows',
        link: 'tvshows',
      },
      {
        name: 'Animations',
        link: 'animations',
      },
    ];
    this.mediaService = [
      {
        title: 'Apple Tv +',
        src: '../../../assets/icons/apple-tv.png',
      },
      {
        title: 'Netflix',
        src: '../../../assets/icons/netflix.png',
      },
      {
        title: 'HBO Max',
        src: '../../../assets/icons/hbo.png',
      },
    ];
    this.genres = [
      'Action',
      'Comedy',
      'Sci fi',
      'Drama',
      'Thriller',
      'Western',
      'Horror',
      'Romance',
    ];
    this.user = {
      name: '',
      lastName: '',
      email: '',
    };
  }

  getUrl(event: any) {
    this.menuItems[0].link = event.link;
  }

  ngOnInit(): void {
    this.router.navigate(['ngmovies/movies']);
    this.getUser();
    let obj = {
      value: localStorage.getItem('mode'),
    };
    this.labelPosition = obj.value;
    this.switchMode(obj);
  }

  async switchMode(isLightMode: any) {
    localStorage.setItem('mode', `${isLightMode.value}`);
    const hostClass = isLightMode.value == 'dark' ? '' : 'theme-light';
    this.render.setAttribute(this.document.body, 'class', hostClass);
  }

  signOut() {
    this.authService.signOut();
  }

  async getUser() {
    const auth = getAuth();
    const userId = auth.currentUser?.uid;
    this.db.collection("users").doc(userId).ref.onSnapshot({
      includeMetadataChanges:true
    }, (doc:any) => {
      this.db
      .collection('users')
      .doc(userId)
      .get()
      .subscribe((data: any) => {
        this.user = data.data();
      });
    })
    this.db
      .collection('users')
      .doc(userId)
      .get()
      .subscribe((data: any) => {
        this.user = data.data();
      });
  }
}
