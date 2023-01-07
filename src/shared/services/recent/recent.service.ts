import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getAuth } from 'firebase/auth';

const COLLECTION_SIZE = 50;

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
    let shows: any[] = [];
    let movies: any[] = [];
    this.getMovies().subscribe((data: any) => {
      shows = data.filter((el: any) => el.name);
      let showsSize = shows.length;
      if (showsSize >= COLLECTION_SIZE) {
        shows = shows.sort((a: any, b: any) => {
          return a.createdAt - b.createdAt;
        });
        this.removeMovie(shows[0]);
        return;
      }

      movies = data.filter((el: any) => el.title);
      let moviesSize = movies.length;
      if (moviesSize >= COLLECTION_SIZE) {
        movies = movies.sort((a: any, b: any) => {
          return a.createdAt - b.createdAt;
        });
        this.removeMovie(movies[0]);
        return;
      }
    });

    const auth = getAuth();
    const userId = auth.currentUser?.uid;
    const id = this.db.createId();
    movie.recentCollection = true;
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
