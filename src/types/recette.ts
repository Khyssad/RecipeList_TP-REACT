// types.ts

export interface Recette {
    id: number;
    nom: string;
    description: string;
    temps_preparation: number;
    temps_cuisson: number;
    difficulte: string;
    personnes: number;
    ingredients: string[];
    etapes: string[];
    categorie: string;
}
