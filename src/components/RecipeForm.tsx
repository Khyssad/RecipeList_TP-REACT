import React, { useState } from "react";
import { Recette } from "../types/recette";

// Définition des props du composant
interface RecipeFormProps {
  initialRecipe?: Recette; // Recette initiale (optionnelle) pour l'édition
  onSubmit: (recipe: Omit<Recette, "id">) => void; // Fonction appelée lors de la soumission du formulaire
}

// Interface pour les erreurs de validation
interface ValidationErrors {
  [key: string]: string;
}

// Définition du composant RecipeForm
const RecipeForm: React.FC<RecipeFormProps> = ({ initialRecipe, onSubmit }) => {
  // État local pour stocker les données de la recette
  const [recipe, setRecipe] = useState<Omit<Recette, "id">>(
    initialRecipe || {
      nom: "",
      description: "",
      temps_preparation: 0,
      temps_cuisson: 0,
      difficulte: "",
      personnes: 0,
      ingredients: [],
      etapes: [],
      categorie: "",
    },
  );

  // État local pour stocker les erreurs de validation
  const [errors, setErrors] = useState<ValidationErrors>({});

  // Définition des règles de validation pour chaque champ
  const validations = {
    nom: /^[a-zA-ZÀ-ÿ\s'-]{3,50}$/,
    description: /^.{10,500}$/,
    temps_preparation: /^[1-9]\d{0,2}$/,
    temps_cuisson: /^[0-9]\d{0,2}$/,
    difficulte: /^(Facile|Moyen|Difficile)$/,
    personnes: /^[1-9]\d{0,1}$/,
    categorie: /^[a-zA-ZÀ-ÿ\s]{3,30}$/,
  };

  // Messages d'erreur correspondant à chaque champ
  const errorMessages = {
    nom: "Le nom doit contenir entre 3 et 50 caractères alphabétiques.",
    description: "La description doit contenir entre 10 et 500 caractères.",
    temps_preparation:
      "Le temps de préparation doit être un nombre entre 1 et 999 minutes.",
    temps_cuisson:
      "Le temps de cuisson doit être un nombre entre 0 et 999 minutes.",
    difficulte: "La difficulté doit être 'Facile', 'Moyen' ou 'Difficile'.",
    personnes: "Le nombre de personnes doit être un nombre entre 1 et 99.",
    categorie:
      "La catégorie doit contenir entre 3 et 30 caractères alphabétiques.",
  };

  // Fonction pour valider un champ spécifique
  const validateField = (name: string, value: string): string => {
    if (name in validations) {
      const regex = validations[name as keyof typeof validations];
      if (!regex.test(value)) {
        return errorMessages[name as keyof typeof errorMessages];
      }
    }
    return "";
  };

  // Gestion du changement de valeur pour les champs simples
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setRecipe((prev) => ({ ...prev, [name]: value }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  // Gestion du changement de valeur pour les champs de type array (ingrédients et étapes)
  const handleArrayChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    field: "ingredients" | "etapes",
  ) => {
    const values = e.target.value
      .split("\n")
      .filter((item) => item.trim() !== "");
    setRecipe((prev) => ({ ...prev, [field]: values }));
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: ValidationErrors = {};
    Object.keys(recipe).forEach((key) => {
      if (key in validations) {
        const error = validateField(
          key,
          String(recipe[key as keyof Omit<Recette, "id">]),
        );
        if (error) {
          newErrors[key] = error;
        }
      }
    });

    if (Object.keys(newErrors).length === 0) {
      onSubmit(recipe);
    } else {
      setErrors(newErrors);
    }
  };

  // Rendu du formulaire
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Champ pour le nom de la recette */}
      <div>
        <label htmlFor="nom" className="block mb-2 font-bold text-gray-700">
          Nom de la recette
        </label>
        <input
          type="text"
          id="nom"
          name="nom"
          value={recipe.nom}
          onChange={handleChange}
          required
          className={`w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline ${errors.nom ? "border-red-500" : ""}`}
        />
        {errors.nom && (
          <p className="text-red-500 text-xs italic">{errors.nom}</p>
        )}
      </div>

      {/* Champ pour la description */}
      <div>
        <label
          htmlFor="description"
          className="block mb-2 font-bold text-gray-700"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={recipe.description}
          onChange={handleChange}
          required
          className={`w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline ${errors.description ? "border-red-500" : ""}`}
        />
        {errors.description && (
          <p className="text-red-500 text-xs italic">{errors.description}</p>
        )}
      </div>

      {/* Champs pour les temps de préparation et de cuisson */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="temps_preparation"
            className="block mb-2 font-bold text-gray-700"
          >
            Temps de préparation (min)
          </label>
          <input
            type="number"
            id="temps_preparation"
            name="temps_preparation"
            value={recipe.temps_preparation}
            onChange={handleChange}
            required
            className={`w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline ${errors.temps_preparation ? "border-red-500" : ""}`}
          />
          {errors.temps_preparation && (
            <p className="text-red-500 text-xs italic">
              {errors.temps_preparation}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="temps_cuisson"
            className="block mb-2 font-bold text-gray-700"
          >
            Temps de cuisson (min)
          </label>
          <input
            type="number"
            id="temps_cuisson"
            name="temps_cuisson"
            value={recipe.temps_cuisson}
            onChange={handleChange}
            required
            className={`w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline ${errors.temps_cuisson ? "border-red-500" : ""}`}
          />
          {errors.temps_cuisson && (
            <p className="text-red-500 text-xs italic">
              {errors.temps_cuisson}
            </p>
          )}
        </div>
      </div>

      {/* Champ pour la difficulté */}
      <div>
        <label
          htmlFor="difficulte"
          className="block mb-2 font-bold text-gray-700"
        >
          Difficulté
        </label>
        <select
          id="difficulte"
          name="difficulte"
          value={recipe.difficulte}
          onChange={handleChange}
          required
          className={`w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline ${errors.difficulte ? "border-red-500" : ""}`}
        >
          <option value="">Sélectionnez une difficulté</option>
          <option value="Facile">Facile</option>
          <option value="Moyen">Moyen</option>
          <option value="Difficile">Difficile</option>
        </select>
        {errors.difficulte && (
          <p className="text-red-500 text-xs italic">{errors.difficulte}</p>
        )}
      </div>

      {/* Champ pour le nombre de personnes */}
      <div>
        <label
          htmlFor="personnes"
          className="block mb-2 font-bold text-gray-700"
        >
          Nombre de personnes
        </label>
        <input
          type="number"
          id="personnes"
          name="personnes"
          value={recipe.personnes}
          onChange={handleChange}
          required
          className={`w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline ${errors.personnes ? "border-red-500" : ""}`}
        />
        {errors.personnes && (
          <p className="text-red-500 text-xs italic">{errors.personnes}</p>
        )}
      </div>

      {/* Champ pour les ingrédients */}
      <div>
        <label
          htmlFor="ingredients"
          className="block mb-2 font-bold text-gray-700"
        >
          Ingrédients (un par ligne)
        </label>
        <textarea
          id="ingredients"
          name="ingredients"
          value={recipe.ingredients.join("\n")}
          onChange={(e) => handleArrayChange(e, "ingredients")}
          required
          className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
        />
      </div>

      {/* Champ pour les étapes */}
      <div>
        <label htmlFor="etapes" className="block mb-2 font-bold text-gray-700">
          Étapes (une par ligne)
        </label>
        <textarea
          id="etapes"
          name="etapes"
          value={recipe.etapes.join("\n")}
          onChange={(e) => handleArrayChange(e, "etapes")}
          required
          className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
        />
      </div>

      {/* Champ pour la catégorie */}
      <div>
        <label
          htmlFor="categorie"
          className="block mb-2 font-bold text-gray-700"
        >
          Catégorie
        </label>
        <input
          type="text"
          id="categorie"
          name="categorie"
          value={recipe.categorie}
          onChange={handleChange}
          required
          className={`w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline ${errors.categorie ? "border-red-500" : ""}`}
        />
        {errors.categorie && (
          <p className="text-red-500 text-xs italic">{errors.categorie}</p>
        )}
      </div>

      {/* Bouton de soumission du formulaire */}
      <button
        type="submit"
        className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
      >
        Enregistrer la recette
      </button>
    </form>
  );
};

export default RecipeForm;
