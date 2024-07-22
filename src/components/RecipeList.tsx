import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Recette } from '../types/recette';
import FavoriteRecipe from './FavoriteRecipe';

interface RecipeListProps {
    recettes: Recette[];
    favorites: number[];
    onToggleFavorite: (recette: Recette) => void;
}

const RecipeList: React.FC<RecipeListProps> = ({ recettes, favorites, onToggleFavorite }) => {
    const navigate = useNavigate();

    const handleImageClick = (recetteId: number) => {
        navigate(`/recette/${recetteId}`);
    };

    return (
        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {recettes.map((recette) => (
                <div key={recette.id} className="flex flex-col h-full">
                    <img
                        src={`https://placehold.co/300x200/FCEAB9/35343C?text=${recette.categorie}`}
                        className="w-full h-48 object-cover rounded-t-lg cursor-pointer"
                        alt={recette.nom}
                        onClick={() => handleImageClick(recette.id)}
                    />
                    <FavoriteRecipe 
                        recette={recette}
                        isFavorite={favorites.includes(recette.id)}
                        onToggleFavorite={onToggleFavorite}
                    />
                </div>
            ))}
        </section>
    );
};

export default RecipeList;