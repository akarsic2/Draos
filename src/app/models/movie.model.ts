import { Genre } from './genre.model';
import { Actor } from './actor.model';

export class Movie {
    id: number;
    naziv: string;
    kratakOpis: string;
    reziser: string;
    scenaristi: string;
    producent: string;
    trailer: string;
    slika: string;
    trajanje: string;

    zanrovi: Genre[];
    glumci: Actor[];
    ocjene: number[];

    isExpanded: boolean = false;
    isSelected: boolean = false;
  }