import { User } from './models/user.model';
import { Genre } from './models/genre.model';
import { Actor } from './models/actor.model';
import { Movie } from './models/movie.model';
import { List } from './models/list.model';

export class MockData{

    public static users: User[] =  [
                        {id:1, ime: 'Admin', prezime: 'Admin', username:'admin', password:'admin', datumRodjenja: '01/01/19800', email:'admin@gmail.com', zemlja: 'Bosnia and Herzegovina', isAdmin: true},
                        {id:1, ime: 'User', prezime: 'User', username:'user', password:'user', datumRodjenja: '01/01/19800', email:'user@gmail.com', zemlja: 'Bosnia and Herzegovina', isAdmin: false}
                    ];

    public static genres: Genre[] = [
                        {id:1, zanr: "Drama"},
                        {id:2, zanr: "Horor"},
                        {id:3, zanr: "Triler"},
                        {id:4, zanr: "Komedija"}
                    ];

    public static actors: Actor[] = [
                        {id:1, name: "Tom", lastName: "Hanks"},
                        {id:2, name: "Robert", lastName:"De Niro"},
                        {id:3, name: "Leonardo", lastName:"DiCaprio"},
                        {id:4, name: "Brad", lastName:"Pitt"},
                        {id:5, name: "Angelina", lastName:"Jolie"},
                        {id:5, name: "Julia", lastName:"Roberts"},
                        {id:6, name: "Sandra", lastName:"Bullock"},
                        {id:7, name: "Anna", lastName:"Hathaway"}
                    ];

    public static movies: Movie[] = [
                        {id:1, naziv:"The Godfather", kratakOpis:"Kum (eng. The Godfather) je kriminalistička drama Francisa Forda Coppole temeljena na istoimenom romanu Maria Puza.", reziser:"Reziser", scenaristi:"Scenaristi", producent:"Producent", trailer:"https://www.youtube.com/watch?v=sY1S34973zA", slika:"slika", zanrovi: [MockData.genres[0], MockData.genres[1]], glumci: [MockData.actors[0], MockData.actors[1]]},
                        {id:1, naziv:"Schindler's List", kratakOpis:"Schindlerova lista (eng. Schindler's List) je američka epska drama iz 1993. godine koju je producirao i režirao Steven Spielberg.", reziser:"Reziser", scenaristi:"Scenaristi", producent:"Producent", trailer:"https://www.youtube.com/watch?v=gG22XNhtnoY", slika:"slika", zanrovi: [MockData.genres[1], MockData.genres[2]], glumci: [MockData.actors[1], MockData.actors[2]]}
                    ];

    public static lists: List[] = [
                        {id:1, listName:"Filmovi za opustanje", movies: [MockData.movies[0]]},
                        {id:2, listName:"Naucni filmovi", movies:[MockData.movies[0], MockData.movies[1]]},
                        {id:3, listName:"Historijski filmovi", movies:[]}
                    ];
}