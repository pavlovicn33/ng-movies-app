export interface StreamMovieTv {
    server: string;
    title: string;
    quality: string;
    size: number;
    exact_match?: number;
    url: string;
}

export interface Stream {
    message:string,
    results:StreamMovieTv[]
    status:number
    title:string
}