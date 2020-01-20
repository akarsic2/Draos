import { User } from './models/user.model';

export class MockData{

    // id: number;
    // ime: string;
    // prezime: string;
    // username: string;
    // password: string;
    // email: string;
    // datumRodjenja: string;
    // zemlja: string;
    // isAdmin: boolean;
    public static users: User[] =  [
                        {id:1, ime: 'Admin', prezime: 'Admin', username:'admin', password:'admin', datumRodjenja: '01/01/19800', email:'admin@gmail.com', zemlja: 'Bosnia and Herzegovina', isAdmin: true},
                        {id:1, ime: 'User', prezime: 'User', username:'user', password:'user', datumRodjenja: '01/01/19800', email:'user@gmail.com', zemlja: 'Bosnia and Herzegovina', isAdmin: false}
                    ];
}