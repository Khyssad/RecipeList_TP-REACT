import React from "react";
import { useNavigate } from "react-router-dom";
import RecipeForm from "../components/RecipeForm";
import { Recette } from "../types/recette";

// URL de l'API pour les opérations sur les recettes
const API_URL = "https://api-recette-26n5.onrender.com/recettes";

const AddRecipe: React.FC = () => {
  // Hook pour la navigation programmatique
  const navigate = useNavigate();

  // Fonction pour gérer la soumission d'une nouvelle recette
  const handleSubmit = async (recipe: Omit<Recette, "id">) => {
    try {
      // Envoi de la requête POST à l'API
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipe),
      });

      // Vérification de la réponse
      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout de la recette");
      }

      // Récupération de la nouvelle recette ajoutée
      const newRecipe = await response.json();
      console.log("Nouvelle recette ajoutée:", newRecipe);

      // Redirection vers la page d'accueil après l'ajout
      navigate("/");
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  // Rendu du composant
  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h1 className="mb-6 text-3xl font-bold">Ajouter une nouvelle recette</h1>
      {/* Utilisation du composant RecipeForm pour l'ajout de recette */}
      <RecipeForm onSubmit={handleSubmit} />
    </div>
  );
};

export default AddRecipe;
