import React, { useState, useEffect } from "react"; // Import des hooks React
import { motion } from "framer-motion"; // Import du module framer-motion pour les animations
import RecipeList from "../components/RecipeList"; // Import du composant RecipeList
import { Recette } from "../types/recette"; // Import du type Recette
import logoImage from "../assets/logo.png"; // Import de l'image du logo

// URL de l'API pour récupérer les recettes
const API_URL = "https://api-recette-26n5.onrender.com/recettes";

const Home: React.FC = () => {
  // États pour gérer les différentes données et états de l'application
  const [recettes, setRecettes] = useState<Recette[]>([]); // Toutes les recettes
  const [searchResults, setSearchResults] = useState<Recette[]>([]); // Résultats de recherche
  const [query, setQuery] = useState(""); // Requête de recherche
  const [error, setError] = useState(""); // Message d'erreur
  const [favorites, setFavorites] = useState<number[]>([]); // IDs des recettes favorites
  const [isLoading, setIsLoading] = useState(false); // État de chargement
  const [hasSearched, setHasSearched] = useState(false); // Indique si une recherche a été effectuée

  // Effet pour charger les recettes et les favoris au montage du composant
  useEffect(() => {
    // Récupère les favoris stockés dans le localStorage
    const storedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]",
    );
    // Met à jour l'état des favoris avec les IDs des recettes favorites
    setFavorites(storedFavorites.map((fav: Recette) => fav.id));
    // Appelle la fonction pour récupérer les recettes depuis l'API
    fetchRecettes();
  }, []);

  // Fonction pour récupérer les recettes depuis l'API
  const fetchRecettes = async () => {
    setIsLoading(true); // Déclenche l'état de chargement
    try {
      const response = await fetch(API_URL); // Effectue la requête vers l'API
      if (!response.ok) {
        // Vérifie si la réponse est correcte
        throw new Error(`HTTP error! status: ${response.status}`); // Lève une erreur en cas de problème
      }
      const data = await response.json(); // Parse la réponse en JSON
      setRecettes(data); // Met à jour l'état des recettes avec les données récupérées
    } catch (err) {
      // Gère les erreurs
      setError(
        `Une erreur est survenue lors du chargement des recettes: ${err instanceof Error ? err.message : String(err)}`,
      );
    } finally {
      setIsLoading(false); // Arrête l'état de chargement
    }
  };

  // Fonction pour gérer le basculement de l'état favori d'une recette
  const handleToggleFavorite = (recette: Recette) => {
    // Met à jour l'état des favoris en ajoutant ou retirant la recette
    const newFavorites = favorites.includes(recette.id)
      ? favorites.filter((id) => id !== recette.id)
      : [...favorites, recette.id];
    setFavorites(newFavorites); // Met à jour l'état des favoris
    // Stocke les nouveaux favoris dans le localStorage
    localStorage.setItem(
      "favorites",
      JSON.stringify(recettes.filter((r) => newFavorites.includes(r.id))),
    );
  };

  // Fonction pour effectuer la recherche de recettes
  const searchRecette = (e: React.FormEvent<HTMLFormElement>) => {
    // Empêche le rechargement de la page lors de la soumission du formulaire
    e.preventDefault();

    // Vérifie si la requête de recherche contient au moins 3 caractères
    if (query.trim().length < 3) {
      // Affiche un message d'erreur si la requête est trop courte
      setError("Merci de taper un mot-clé de 3 caractères minimum");
      return;
    }

    // Déclenche l'état de chargement
    setIsLoading(true);
    // Réinitialise les erreurs précédentes
    setError("");

    // Filtre les recettes en fonction de la requête
    const filteredRecettes = recettes.filter((recette: Recette) => {
      // Vérifie si le nom de la recette correspond à la requête
      const nomMatch =
        recette.nom &&
        typeof recette.nom === "string" &&
        recette.nom.toLowerCase().includes(query.toLowerCase());
      // Vérifie si la description de la recette correspond à la requête
      const descriptionMatch =
        recette.description &&
        typeof recette.description === "string" &&
        recette.description.toLowerCase().includes(query.toLowerCase());
      // Retourne true si le nom ou la description correspondent à la requête
      return nomMatch || descriptionMatch;
    });

    // Vérifie si aucune recette n'a été trouvée
    if (filteredRecettes.length === 0) {
      // Vide les résultats de recherche et affiche un message d'erreur
      setSearchResults([]);
      setError("Aucune recette trouvée");
    } else {
      // Met à jour les résultats de recherche avec les recettes filtrées
      setSearchResults(filteredRecettes);
    }

    // Indique que la recherche a été effectuée
    setHasSearched(true);
    // Arrête l'état de chargement
    setIsLoading(false);
  };

  // Rendu du composant
  return (
    <main className="container mx-auto mt-8">
      {/* Animation du logo */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-center mb-6"
      >
        <img
          src={logoImage}
          alt="Recette.com Logo"
          className="max-w-xs w-full h-auto"
        />
      </motion.div>

      {/* Titre animé */}
      <motion.div>
        <h3 className="mb-4 text-xl text-center">
          Trouvez les recettes de votre choix en 2 clics !
        </h3>
      </motion.div>

      {/* Formulaire de recherche animé */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <form onSubmit={searchRecette} className="mb-8">
          <div className="flex">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher une recette..."
              className="flex-grow px-4 py-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            />
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-500 rounded-r hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
              </svg>
            </button>
          </div>
        </form>
        {isLoading && <p className="text-center">Chargement...</p>}{" "}
        {/* Message de chargement */}
        {error && <p className="text-center text-red-500">{error}</p>}{" "}
        {/* Message d'erreur */}
      </motion.div>

      {/* Affichage des résultats de recherche */}
      {hasSearched && !isLoading && searchResults.length > 0 && (
        <RecipeList
          recettes={searchResults}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
        />
      )}
    </main>
  );
};

export default Home; // Export du composant Home
