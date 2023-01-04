export interface PersonMovies {
    character: string;
    credit_id: string;
    release_date: string;
    media_type:string
    vote_count: number;
    video: boolean;
    adult: boolean;
    vote_average: number;
    title: string;
    genre_ids: number[];
    original_language: string;
    original_title: string;
    popularity: number;
    id: number;
    backdrop_path: string;
    overview: string;
    poster_path: string;
}

export interface Person {
    cast: PersonMovies[];
}