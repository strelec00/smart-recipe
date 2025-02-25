import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import profilePic from "../assets/icons/male-user.png";

// Types
type Recipe = {
  id: string;
  title: string;
  category: string;
  prepTime: string;
  difficulty: string;
  tags: string[];
};

const Profile = () => {
  // State for favorite recipes
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);
  const [activeTab, setActiveTab] = useState("favorites");
  const [activeFilter, setActiveFilter] = useState("all");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Mock user data (would come from auth context or API in production)
  const user = {
    name: "John Doe",
    image: { profilePic },
    bio: "Food enthusiast and home cook",
    stats: {
      favorites: 5,
      created: 12,
      cooked: 48,
    },
  };

  // Mock data for favorite recipes (would come from API/database in production)
  useEffect(() => {
    // This would be replaced with actual API call
    const mockFavorites = [
      {
        id: "1",
        title: "Creamy Garlic Pasta",
        category: "dinner",
        prepTime: "25 min",
        difficulty: "easy",
        tags: ["pasta", "vegetarian", "quick"],
      },
      {
        id: "2",
        title: "Avocado Toast with Poached Eggs",
        category: "breakfast",
        prepTime: "15 min",
        difficulty: "easy",
        tags: ["breakfast", "healthy", "quick"],
      },
      {
        id: "3",
        title: "Thai Coconut Curry Soup",
        category: "dinner",
        prepTime: "40 min",
        difficulty: "medium",
        tags: ["soup", "spicy", "asian"],
      },
      {
        id: "4",
        title: "Berry Smoothie Bowl",
        category: "breakfast",
        prepTime: "10 min",
        difficulty: "easy",
        tags: ["breakfast", "healthy", "vegan"],
      },
      {
        id: "5",
        title: "Grilled Salmon with Asparagus",
        category: "dinner",
        prepTime: "30 min",
        difficulty: "medium",
        tags: ["seafood", "healthy", "dinner"],
      },
    ];

    setFavoriteRecipes(mockFavorites);
  }, []);

  // Filter recipes based on active filter
  const filteredRecipes =
    activeFilter === "all"
      ? favoriteRecipes
      : favoriteRecipes.filter((recipe) => recipe.category === activeFilter);

  // Remove recipe from favorites
  const removeFromFavorites = (id: string) => {
    setFavoriteRecipes((prev) => prev.filter((recipe) => recipe.id !== id));
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F9F7F4]">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link to="/" className="text-2xl font-bold text-[#EE4C0C]">
                  ChefAI
                </Link>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  to="/"
                  className="border-transparent text-gray-500 hover:border-[#EE4C0C] hover:text-[#EE4C0C] inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Home
                </Link>
                <Link
                  to="/discover"
                  className="border-transparent text-gray-500 hover:border-[#EE4C0C] hover:text-[#EE4C0C] inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Discover
                </Link>
                <Link
                  to="/create"
                  className="border-transparent text-gray-500 hover:border-[#EE4C0C] hover:text-[#EE4C0C] inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Create Recipe
                </Link>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <div className="ml-3 relative">
                <Link to="/profile">
                  <img
                    className="h-8 w-8 rounded-full border-2 border-[#EE4C0C]"
                    src={user.image.profilePic}
                    alt="User profile"
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null;
                      currentTarget.src = "/assets/icons/male-user.png";
                    }}
                  />
                </Link>
              </div>
            </div>
            <div className="-mr-2 flex items-center sm:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {/* Icon when menu is closed */}
                <svg
                  className={`${mobileMenuOpen ? "hidden" : "block"} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                {/* Icon when menu is open */}
                <svg
                  className={`${mobileMenuOpen ? "block" : "hidden"} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu, show/hide based on menu state */}
        <div className={`${mobileMenuOpen ? "block" : "hidden"} sm:hidden`}>
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-[#EE4C0C] hover:text-[#EE4C0C] block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/discover"
              className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-[#EE4C0C] hover:text-[#EE4C0C] block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Discover
            </Link>
            <Link
              to="/create"
              className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-[#EE4C0C] hover:text-[#EE4C0C] block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Create Recipe
            </Link>
            <Link
              to="/profile"
              className="border-[#EE4C0C] text-[#EE4C0C] bg-red-50 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Profile
            </Link>
          </div>
        </div>
      </nav>

      {/* Profile Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="relative">
              <img
                src={user.image.profilePic}
                alt="Profile"
                className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-[#EE4C0C]"
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src = "/assets/icons/male-user.png";
                }}
              />
              <button className="absolute bottom-0 right-0 bg-[#EEA47F] rounded-full p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-[#34322F]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </button>
            </div>

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl font-bold mb-2">{user.name}</h1>
              <p className="text-gray-600 mb-4">{user.bio}</p>

              <div className="flex flex-wrap justify-center md:justify-start gap-6 mb-4">
                <div className="text-center">
                  <p className="font-bold text-xl">{user.stats.favorites}</p>
                  <p className="text-sm text-gray-500">Favorites</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-xl">{user.stats.created}</p>
                  <p className="text-sm text-gray-500">Created</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-xl">{user.stats.cooked}</p>
                  <p className="text-sm text-gray-500">Cooked</p>
                </div>
              </div>

              <button className="bg-[#EE4C0C] text-white rounded-full px-6 py-2">
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "favorites"
                ? "text-[#EE4C0C] border-b-2 border-[#EE4C0C]"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("favorites")}
          >
            Favorites
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "created"
                ? "text-[#EE4C0C] border-b-2 border-[#EE4C0C]"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("created")}
          >
            Created Recipes
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "history"
                ? "text-[#EE4C0C] border-b-2 border-[#EE4C0C]"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("history")}
          >
            Cooking History
          </button>
        </div>

        {/* Favorites Content */}
        {activeTab === "favorites" && (
          <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <h2 className="text-2xl font-bold">My Favorite Recipes</h2>
              <div className="flex space-x-2">
                <button
                  className={`px-3 py-1 rounded-full text-sm ${
                    activeFilter === "all"
                      ? "bg-[#EE4C0C] text-white"
                      : "bg-gray-100"
                  }`}
                  onClick={() => setActiveFilter("all")}
                >
                  All
                </button>
                <button
                  className={`px-3 py-1 rounded-full text-sm ${
                    activeFilter === "breakfast"
                      ? "bg-[#EE4C0C] text-white"
                      : "bg-gray-100"
                  }`}
                  onClick={() => setActiveFilter("breakfast")}
                >
                  Breakfast
                </button>
                <button
                  className={`px-3 py-1 rounded-full text-sm ${
                    activeFilter === "dinner"
                      ? "bg-[#EE4C0C] text-white"
                      : "bg-gray-100"
                  }`}
                  onClick={() => setActiveFilter("dinner")}
                >
                  Dinner
                </button>
              </div>
            </div>

            {filteredRecipes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRecipes.map((recipe) => (
                  <div
                    key={recipe.id}
                    className="bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:shadow-lg hover:-translate-y-1"
                  >
                    <div className="relative">
                      <img
                        alt={recipe.title}
                        className="w-full h-48 object-cover"
                        onError={({ currentTarget }) => {
                          currentTarget.onerror = null;
                          currentTarget.src = "/assets/recipes/default.jpg";
                        }}
                      />
                      <button
                        className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md"
                        onClick={() => removeFromFavorites(recipe.id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-[#EE4C0C]"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold mb-2">
                        {recipe.title}
                      </h3>
                      <div className="flex justify-between text-sm text-gray-500 mb-3">
                        <span>{recipe.prepTime}</span>
                        <span className="capitalize">{recipe.difficulty}</span>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {recipe.tags.map((tag) => (
                          <span
                            key={tag}
                            className="bg-[#F9F7F4] px-2 py-1 rounded-full text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <Link
                        to={`/recipe/${recipe.id}`}
                        className="block text-center bg-[#EEA47F] text-[#34322F] rounded-full py-2 font-medium hover:bg-[#EE4C0C] hover:text-white transition-colors"
                      >
                        View Recipe
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-xl text-gray-500 mb-4">
                  No favorite recipes found
                </p>
                <Link
                  to="/discover"
                  className="inline-block bg-[#EE4C0C] text-white rounded-full px-6 py-2"
                >
                  Discover Recipes
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Placeholder for other tabs */}
        {activeTab === "created" && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500">
              Your created recipes will appear here
            </p>
          </div>
        )}

        {activeTab === "history" && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500">
              Your cooking history will appear here
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
