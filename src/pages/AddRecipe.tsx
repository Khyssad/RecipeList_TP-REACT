import React from 'react';
import { useNavigate } from 'react-router-dom';
import RecipeForm from '../components/RecipeForm';
import { Recette } from '../types/recette';
// import { Header } from '../components/Header';

const API_URL = 'https://api-recette-26n5.onrender.com/recettes';

const AddRecipe: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = async (recipe: Omit<Recette, 'id'>) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipe),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'ajout de la recette');
      }

      const newRecipe = await response.json();
      console.log('Nouvelle recette ajoutée:', newRecipe);
      navigate('/');
    } catch (error) {
      console.error('Erreur:', error);
      // Gérer l'erreur (par exemple, afficher un message à l'utilisateur)
    }
  };

  return (
    
    <div className="max-w-2xl mx-auto mt-8">
      <h1 className="mb-6 text-3xl font-bold">Ajouter une nouvelle recette</h1>
      <RecipeForm onSubmit={handleSubmit} />
    </div>
  );
};

export default AddRecipe;