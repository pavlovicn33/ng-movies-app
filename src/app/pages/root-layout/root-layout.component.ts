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
import { getAuth } from "firebase/auth";

@Component({
  selector: 'app-root-layout',
  templateUrl: './root-layout.component.html',
  styleUrls: ['./root-layout.component.scss'],
})
export class RootLayoutComponent implements OnInit {
  labelPosition: 'light' | 'dark' = 'dark';
  menuItems: any;
  libraryItems: any;
  miscItems: any;
  logoutItem: any;
  links: any;
  mediaService: any;
  genres: any;
  showFiller = false;

  user:any 

  constructor(
    private authService: AuthService,
    @Inject(DOCUMENT) private document: Document,
    private render: Renderer2,
    private db:AngularFirestore
  ) {
    this.menuItems = [
      {
        icon: 'home',
        title: 'Home',
      },
      {
        icon: 'panorama_fish_eye',
        title: 'Discovery',
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
      },
      {
        icon: 'help_outline',
        title: 'Help',
      },
    ];
    this.logoutItem = [
      {
        icon: 'exit_to_app',
        title: 'logout',
      },
    ];
    this.links = ['Movies', 'TV Shows', 'Animations'];
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
  }

  ngOnInit(): void {
    this.getUser()
  }

  async switchMode(isLightMode: any) {
    console.log(isLightMode);
    const hostClass = isLightMode.value == 'dark' ? '' : 'theme-light';
    this.render.setAttribute(this.document.body, 'class', hostClass);
  }

  signOut() {
    let obj = {
      value: 'dark',
    };
    this.switchMode(obj);
    this.authService.signOut();
  }

  async getUser(){
    const auth = getAuth()
    const userId = auth.currentUser?.uid
    this.db.collection('users').doc(userId).get().subscribe((data:any) => {
      this.user = data.data()
    })
    
  }
}
