import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getAuth } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class RecentService {
  constructor(private db: AngularFirestore) {}

  getMovies() {
    const auth = getAuth();
    const userId = auth.currentUser?.uid;
    return this.db
      .collection('users')
      .doc(userId)
      .collection('recent')
      .valueChanges();
  }

  addMovie(movie: any) {
    const auth = getAuth();
    const userId = auth.currentUser?.uid;
    const id = this.db.createId();
    movie.fsId = id;
    movie.createdAt = new Date();
    return new Promise<any>((resolve, reject) => {
      this.db
        .collection('users')
        .doc(userId)
        .collection('recent')
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
      .collection('recent')
      .doc(String(movie.fsId))
      .delete();
  }
}
