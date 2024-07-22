import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Favoris from './pages/Favoris';
import AddRecipe from './pages/AddRecipe';
import RecipeDetail from './components/RecipeDetail';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-[#D3655A] text-white">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favoris" element={<Favoris />} />
            <Route path="/ajouter" element={<AddRecipe />} />
            <Route path="/recette/:id" element={<RecipeDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;