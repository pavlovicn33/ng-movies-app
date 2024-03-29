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
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/shared/components/dialog/dialog.component';

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
  selectedE: boolean = false;
  uploadFile: File | null = null;
  constructor(
    private authService: AuthService,
    @Inject(DOCUMENT) private document: Document,
    private render: Renderer2,
    private db: AngularFirestore,
    private router: Router,
    private matDialog: MatDialog
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
        icon: 'apps',
        title: 'Discovery',
        link: 'discover',
      },
    ];
    this.libraryItems = [
      {
        icon: 'access_time',
        title: 'Recent',
        link: 'recent',
      },
      {
        icon: 'bookmark_border',
        title: 'Bookmarked',
        link: 'bookmarked',
      },
      {
        icon: 'public',
        title: 'News',
        link: 'news',
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
        link: 'help',
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
      {
        title: 'Action',
        src: 'action',
      },
      {
        title: 'Comedy',
        src: 'comedy',
      },
      {
        title: 'Sci fi',
        src: 'science fiction',
      },
      {
        title: 'Drama',
        src: 'drama',
      },
      {
        title: 'Thriller',
        src: 'thriller',
      },
      {
        title: 'Western',
        src: 'western',
      },
      {
        title: 'Horror',
        src: 'horror',
      },
      {
        title: 'Romance',
        src: 'romance',
      },
    ];
    this.user = {
      name: '',
      lastName: '',
      email: '',
      subscription: '',
      profileImage: ''
    };
  }

  getUrl(event: any) {
    this.menuItems[0].link = event.link;
  }

  ngOnInit(): void {
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
    const dialogRef = this.matDialog.open(DialogComponent, {
      data: {
        title: 'Sign out confirmation',
        description: 'Are you sure you want to logout?',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == true) {
        this.authService.signOut();
      }
    });
  }

  async getUser() {
    const auth = getAuth();
    const userId = auth.currentUser?.uid;

    this.db
      .collection('users')
      .doc(userId)
      .ref.onSnapshot(
        {
          includeMetadataChanges: true,
        },
        (doc: any) => {
          this.db
            .collection('users')
            .doc(userId)
            .get()
            .subscribe((data: any) => {
              this.user.name = data.data().name;
              this.user.lastName = data.data().lastName;
              this.user.subscription = data.data().subscription;
              if (this.user.subscription != 'Free') {
                this.router.navigate(['ngmovies/movies']);
              }
              if(data.data().profileImage) {
                this.user.profileImage = data.data().profileImage
                let AVATAR = document.getElementById('avatar');
                if (AVATAR) {
                  AVATAR.setAttribute('src', String(this.user.profileImage));
                }
              }
            });
        }
      );
    this.db
      .collection('users')
      .doc(userId)
      .get()
      .subscribe((data: any) => {
        this.user = data.data();
        if (auth.currentUser?.email) {
          let mail = auth.currentUser?.email;
          this.user.email = mail;
        }
      });
  }

  uploadImage() {
    document.getElementById('imgupload')?.click();
  }

  sendImage(event: any) {
    let AVATAR = document.getElementById('avatar');
    const file = event.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      if (AVATAR) {
        AVATAR.setAttribute('aria-label', file.name);
        AVATAR.setAttribute('src', String(reader.result));
      }
      this.authService.addProfileImage(String(reader.result));
    };
  }

  openPreview(){
    const dialogRef = this.matDialog.open(DialogComponent, {
      data: {
        showImage:true,
        imgUrl:this.user.profileImage
      },
    });
  }
}
