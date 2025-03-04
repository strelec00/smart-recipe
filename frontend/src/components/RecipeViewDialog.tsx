"use client";

import type React from "react";
import { useState } from "react";
import type { Recipe } from "../types/recipe.ts";
import "../styles/RecipeViewDialog.css";

interface RecipeViewDialogProps {
  recipe: Recipe;
  onClose: () => void;
}

export function RecipeViewDialog({ recipe, onClose }: RecipeViewDialogProps) {
  const [activeTab, setActiveTab] = useState("ingredients");

  // Close dialog when clicking outside
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="dialog-backdrop" onClick={handleBackdropClick}>
      <div className="dialog-content">
        <div className="dialog-header">
          <div className="dialog-title-container">
            <h2 className="dialog-title">{recipe.title}</h2>
            <div className="dialog-actions">
              <button className="dialog-action-button">❤️</button>
              <button className="dialog-action-button">📤</button>
              <button className="dialog-action-button">🖨️</button>
              <button className="dialog-close-button" onClick={onClose}>
                ✕
              </button>
            </div>
          </div>
          <div className="dialog-meta">
            <span className="dialog-rating">
              ⭐ {recipe.rating} ({recipe.reviews} reviews)
            </span>
            <span className="dialog-time">⏱️ {recipe.cookTime} mins</span>
            <span className="dialog-servings">
              👥 {recipe.servings} servings
            </span>
          </div>
        </div>

        <div className="dialog-body">
          <div className="recipe-details">
            <div className="recipe-image-large">
              <img
                src={recipe.image || "https://via.placeholder.com/400x300"}
                alt={recipe.title}
              />
              <div className="recipe-tags-large">
                <span className="recipe-category-large">{recipe.category}</span>
                {recipe.tags.map((tag, index) => (
                  <span key={index} className="recipe-tag-large">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="recipe-description">
                <h3>About this recipe</h3>
                <p>{recipe.description}</p>
              </div>
            </div>

            <div className="recipe-content-tabs">
              <div className="tabs-header">
                <button
                  className={`tab-button ${
                    activeTab === "ingredients" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("ingredients")}
                >
                  Ingredients
                </button>
                <button
                  className={`tab-button ${
                    activeTab === "instructions" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("instructions")}
                >
                  Instructions
                </button>
                <button
                  className={`tab-button ${
                    activeTab === "nutrition" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("nutrition")}
                >
                  Nutrition
                </button>
              </div>

              <div className="tab-content">
                {activeTab === "ingredients" && (
                  <div className="ingredients-content">
                    <h3>Ingredients</h3>
                    <ul className="ingredients-list">
                      {recipe.ingredients.map((ingredient, index) => (
                        <li key={index} className="ingredient-item">
                          <input type="checkbox" id={`ingredient-${index}`} />
                          <label htmlFor={`ingredient-${index}`}>
                            {ingredient}
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeTab === "instructions" && (
                  <div className="instructions-content">
                    <h3>Instructions</h3>
                    <ol className="instructions-list">
                      {recipe.instructions.map((step, index) => (
                        <li key={index} className="instruction-step">
                          <span className="step-number">{index + 1}</span>
                          <p>{step}</p>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                {activeTab === "nutrition" && (
                  <div className="nutrition-content">
                    <h3>Nutrition Facts</h3>
                    <div className="nutrition-list">
                      {Object.entries(recipe.nutrition).map(([key, value]) => (
                        <div key={key} className="nutrition-item">
                          <span className="nutrition-key">
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                          </span>
                          <span className="nutrition-value">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="dialog-footer">
          <div className="recipe-author-info">
            Recipe by <span className="author-name">{recipe.author}</span>
          </div>
          <button className="close-button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
