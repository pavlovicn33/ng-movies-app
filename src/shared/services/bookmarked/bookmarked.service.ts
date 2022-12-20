import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getAuth } from 'firebase/auth';
import { ResultMovies } from 'src/shared/models/popularMovies';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookmarkedService {
  constructor(private db: AngularFirestore) {}

  getMovies() {
    const auth = getAuth();
    const userId = auth.currentUser?.uid;
    return this.db.collection('users').doc(userId).collection('bookmarks').valueChanges()
  }

  addMovie(movie: any) {
    const auth = getAuth();
    const userId = auth.currentUser?.uid;
    const id = this.db.createId()
    movie.fsId = id
    return new Promise<any>((resolve, reject) => {
      this.db
        .collection('users')
        .doc(userId)
        .collection('bookmarks')
        .doc(id)
        .set(movie)
    });
  }

  removeMovie(movie: any) {
    const auth = getAuth();
    const userId = auth.currentUser?.uid;
    return this.db.collection('users').doc(userId).collection('bookmarks').doc(String(movie.fsId)).delete();
  }
}
