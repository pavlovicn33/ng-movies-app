import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FieldValue } from '@angular/fire/firestore';
import { getAuth } from 'firebase/auth';

const DEFAULT_PAGE_SIZE = 20;

@Injectable({
  providedIn: 'root',
})
export class BookmarkedService {
  constructor(private db: AngularFirestore) {}

  getMovies() {
    const auth = getAuth();
    const userId = auth.currentUser?.uid;
    return this.db
      .collection('users')
      .doc(userId)
      .collection('bookmarks')
      .valueChanges();
  }

  getBookmarkedPaginatedShows(page: number) {
    const auth = getAuth();
    const userId = auth.currentUser?.uid;
    return this.db
      .collection('users')
      .doc(userId)
      .collection('bookmarks', (ref) =>
        ref.limit(page * DEFAULT_PAGE_SIZE).where('name', '!=', false)
      )
      .valueChanges();
  }
  getBookmarkedPaginatedMovies(page: number) {
    const auth = getAuth();
    const userId = auth.currentUser?.uid;
    return this.db
      .collection('users')
      .doc(userId)
      .collection('bookmarks', (ref) =>
        ref.limit(page * DEFAULT_PAGE_SIZE).where('title', '!=', false)
      )
      .valueChanges();
  }

  addMovie(movie: any) {
    const auth = getAuth();
    const userId = auth.currentUser?.uid;
    const id = this.db.createId();
    movie.fsId = id;
    movie.createdAt = new Date()
    return new Promise<any>((resolve, reject) => {
      this.db
        .collection('users')
        .doc(userId)
        .collection('bookmarks')
        .doc(id)
        .set(movie);
    });
  }

  removeMovie(movie: any) {
    const auth = getAuth();
    const userId = auth.currentUser?.uid;
    return this.db
      .collection('users')
      .doc(userId)
      .collection('bookmarks')
      .doc(String(movie.fsId))
      .delete();
  }
}
