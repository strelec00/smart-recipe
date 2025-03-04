"use client";

import { useState } from "react";
import type { Recipe } from "../types/recipe.ts";
import { RecipeViewDialog } from "./RecipeViewDialog";
import "../styles/RecipeCard.css";

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  const [isFavorite, setIsFavorite] = useState(true);
  const [isViewOpen, setIsViewOpen] = useState(false);

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <>
      <div className="recipe-card">
        <div className="recipe-image-container">
          <img
            src={recipe.image || "https://via.placeholder.com/400x300"}
            alt={recipe.title}
            className="recipe-image"
          />
          <button
            className={`favorite-button ${isFavorite ? "active" : ""}`}
            onClick={handleToggleFavorite}
          >
            {isFavorite ? "❤️" : "🤍"}
          </button>
        </div>

        <div className="recipe-header">
          <div className="recipe-title-container">
            <h3 className="recipe-title">{recipe.title}</h3>
            <p className="recipe-author">{recipe.author}</p>
          </div>
          <div className="recipe-rating">⭐ {recipe.rating}</div>
        </div>

        <div className="recipe-content">
          <div className="recipe-tags">
            <span className="recipe-category">{recipe.category}</span>
            {recipe.tags.map((tag, index) => (
              <span key={index} className="recipe-tag">
                {tag}
              </span>
            ))}
          </div>

          <div className="recipe-time">⏱️ {recipe.cookTime} mins</div>
        </div>

        <div className="recipe-footer">
          <button
            className="view-recipe-button"
            onClick={() => setIsViewOpen(true)}
          >
            View Recipe
          </button>
          <button className="share-button">📤</button>
        </div>
      </div>

      {isViewOpen && (
        <RecipeViewDialog
          recipe={recipe}
          onClose={() => setIsViewOpen(false)}
        />
      )}
    </>
  );
}
