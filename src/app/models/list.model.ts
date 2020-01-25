import { Movie } from './movie.model';

export class List {
    id: number;
    listName: string;
    movies: Movie[];

    constructor(id: number, name: string){
        this.id = id;
        this.listName = name;
    }
  }