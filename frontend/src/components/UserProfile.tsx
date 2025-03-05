"use client";

import { useState } from "react";
import { RecipeCard } from "./RecipeCard";
import { recipes } from "../data/recipe";
import "../styles/UserProfile.css";

export function UserProfile() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredRecipes = recipes.filter(
    (recipe) =>
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (activeTab === "all" || recipe.category === activeTab)
  );

  return (
    <div className="profile-container">
      <div className="profile-content">
        {/* Profile Sidebar */}
        <div className="profile-sidebar">
          <div className="user-info">
            <div className="avatar">
              <img src="https://via.placeholder.com/96" alt="User" />
            </div>
            <h2 className="username">Jane Doe</h2>
            <p className="user-bio">Food enthusiast</p>

            <div className="sidebar-nav">
              <button className="sidebar-button">
                <span className="icon">👤</span>
                Profile
              </button>
              <button className="sidebar-button active">
                <span className="icon">❤️</span>
                Favorites
              </button>
              <button className="sidebar-button">
                <span className="icon">👨‍🍳</span>
                My Recipes
              </button>
              <button className="sidebar-button">
                <span className="icon">⚙️</span>
                Settings
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">
          <div className="content-header">
            <h1>My Favorite Recipes</h1>
            <div className="search-container">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search favorites..."
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="tabs">
            <button
              className={`tab ${activeTab === "all" ? "active" : ""}`}
              onClick={() => setActiveTab("all")}
            >
              All
            </button>
            <button
              className={`tab ${activeTab === "breakfast" ? "active" : ""}`}
              onClick={() => setActiveTab("breakfast")}
            >
              Breakfast
            </button>
            <button
              className={`tab ${activeTab === "lunch" ? "active" : ""}`}
              onClick={() => setActiveTab("lunch")}
            >
              Lunch
            </button>
            <button
              className={`tab ${activeTab === "dinner" ? "active" : ""}`}
              onClick={() => setActiveTab("dinner")}
            >
              Dinner
            </button>
            <button
              className={`tab ${activeTab === "dessert" ? "active" : ""}`}
              onClick={() => setActiveTab("dessert")}
            >
              Dessert
            </button>
          </div>

          <div className="recipes-grid">
            {filteredRecipes.length > 0 ? (
              filteredRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))
            ) : (
              <p className="no-recipes">
                No recipes found matching your search.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
