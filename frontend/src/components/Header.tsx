import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import profilePic from "../assets/icons/male-user.png";
import dataIngredients from "../data/ingredients.json";

type HeaderProps = {
  logged: boolean;
};

interface Recipe {
  id: number;
  title: string;
  ingredients: string[];
  instructions: string[];
  prepTime: number;
  cookTime: number;
  servings: number;
  image: string;
  difficulty: "Easy" | "Medium" | "Hard";
  calories: number;
}

const Header = ({ logged }: HeaderProps) => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [suggestionOpen, setSuggestionOpen] = useState(false);
  const [value, setValue] = useState("");
  const [errorSuggestionMessage, setErrorSuggestionMessage] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);

  // Recipe generation states
  const [showRecipes, setShowRecipes] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeRecipe, setActiveRecipe] = useState<Recipe | null>(null);
  const [error, setError] = useState("");

  const suggestionRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isValidIngredient =
    value.trim() !== "" &&
    !ingredients.includes(value) &&
    dataIngredients.some(
      (item) => item.ingredient.toLowerCase() === value.toLowerCase()
    );

  const isUsed = dataIngredients.some(
    (item) => item.ingredient.toLowerCase() === value.toLowerCase()
  );

  const handleSearch = () => {
    setSuggestionOpen(true);
    if (isValidIngredient) {
      setIngredients([...ingredients, value]);
      setValue("");
      setErrorSuggestionMessage("");
      setSelectedIndex(-1);
    } else {
      if (isUsed) {
        setErrorSuggestionMessage("Ingredient already used!");
      } else {
        setErrorSuggestionMessage("Ingredient doesn't exist!");
      }
      setValue("");
    }
  };

  const filteredSuggestions = dataIngredients
    .filter((item) => {
      const searchTerm = value.toLowerCase();
      const ingredient = item.ingredient.toLowerCase();
      return (
        searchTerm &&
        ingredient.startsWith(searchTerm) &&
        searchTerm !== ingredient
      );
    })
    .slice(0, 4);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (filteredSuggestions.length > 0) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredSuggestions.length - 1 ? prev + 1 : prev
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (selectedIndex !== -1) {
          setValue(filteredSuggestions[selectedIndex].ingredient);
          setSuggestionOpen(false);
          setSelectedIndex(-1);
        } else {
          handleSearch();
        }
      }
    } else if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  // Close suggestion box when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        suggestionRef.current &&
        !suggestionRef.current.contains(event.target as Node)
      ) {
        setSuggestionOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Function to generate recipes based on ingredients
  const generateRecipes = async () => {
    if (ingredients.length === 0) {
      setErrorSuggestionMessage("Please add at least one ingredient");
      return;
    }

    setLoading(true);
    setShowRecipes(true);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock recipe data - in a real app, this would come from your API
      const mockRecipes: Recipe[] = [
        {
          id: 1,
          title: "Spaghetti Carbonara",
          ingredients: [
            "Pasta",
            "Eggs",
            "Bacon",
            "Parmesan Cheese",
            "Black Pepper",
            "Salt",
          ],
          instructions: [
            "Boil pasta according to package instructions.",
            "In a separate pan, cook bacon until crispy.",
            "Beat eggs and mix with grated parmesan cheese.",
            "Drain pasta and immediately add to the bacon pan.",
            "Remove from heat and quickly stir in the egg mixture.",
            "Season with black pepper and salt to taste.",
          ],
          prepTime: 10,
          cookTime: 15,
          servings: 4,
          image: "/src/assets/recipe1.jpg",
          difficulty: "Medium",
          calories: 450,
        },
        {
          id: 2,
          title: "Vegetable Stir Fry",
          ingredients: [
            "Bell Peppers",
            "Broccoli",
            "Carrots",
            "Soy Sauce",
            "Ginger",
            "Garlic",
            "Olive Oil",
          ],
          instructions: [
            "Chop all vegetables into bite-sized pieces.",
            "Heat olive oil in a wok or large pan.",
            "Add minced garlic and ginger, sauté for 30 seconds.",
            "Add vegetables and stir fry for 5-7 minutes until tender-crisp.",
            "Add soy sauce and continue cooking for 1 minute.",
            "Serve hot, optionally over rice.",
          ],
          prepTime: 15,
          cookTime: 10,
          servings: 3,
          image: "/src/assets/recipe2.jpg",
          difficulty: "Easy",
          calories: 280,
        },
        {
          id: 3,
          title: "Chicken Curry",
          ingredients: [
            "Chicken Breast",
            "Curry Powder",
            "Coconut Milk",
            "Onion",
            "Garlic",
            "Ginger",
            "Vegetable Oil",
            "Salt",
          ],
          instructions: [
            "Cut chicken into cubes.",
            "Heat oil in a large pot over medium heat.",
            "Add diced onion and cook until translucent.",
            "Add minced garlic and ginger, cook for 1 minute.",
            "Add chicken and cook until browned on all sides.",
            "Stir in curry powder and cook for 1 minute.",
            "Pour in coconut milk, bring to a simmer.",
            "Reduce heat and cook for 15-20 minutes until chicken is cooked through.",
            "Season with salt to taste.",
          ],
          prepTime: 20,
          cookTime: 25,
          servings: 4,
          image: "/src/assets/recipe3.jpg",
          difficulty: "Medium",
          calories: 420,
        },
      ];

      // Filter recipes based on ingredients
      const filteredRecipes = mockRecipes.filter((recipe) => {
        // Check if recipe contains at least one of the selected ingredients
        return ingredients.some((ingredient) =>
          recipe.ingredients.some((recipeIngredient) =>
            recipeIngredient.toLowerCase().includes(ingredient.toLowerCase())
          )
        );
      });

      setRecipes(filteredRecipes);
      if (filteredRecipes.length > 0) {
        setActiveRecipe(filteredRecipes[0]);
      } else {
        setError(
          "No recipes found with your ingredients. Try different combinations."
        );
      }
    } catch (err) {
      setError("Failed to generate recipes. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Reset recipe view
  const handleBackToIngredients = () => {
    setShowRecipes(false);
    setError("");
  };

  return (
    <div className="flex flex-col min-h-screen w-full">
      {!showRecipes ? (
        // Original Header View
        <div className="flex flex-col h-screen w-full">
          {/* Content & Background */}
          <div className="flex h-full w-full">
            {logged && (
              <div className="xs:m-5 m-2 sm:w-[75px] sm:h-[75px] w-[60px] h-[60px] absolute">
                <Link to="/profile">
                  <img src={profilePic} alt="" className="rounded-full" />
                </Link>
              </div>
            )}
            {/* Content */}
            <div className="xmd:w-1/3 w-full h-full sm:px-2 px-2 xl:pl-10 flex flex-col xmd:pt-[17%] xmd:justify-normal justify-center">
              <div className="w-full text-center">
                <p className="text-[52px] font-crimson font-light">
                  Be your own Chef
                </p>
                {!logged && (
                  <>
                    <p className="text-[22px] font-crimson px-[0px] text-[#585147]">
                      Create recipes with ingredients you have at home, access
                      our AI recipe maker
                    </p>
                    <div className="flex justify-center mt-[50px] space-x-9">
                      <button className="rounded-[30px] border-black border w-[148px] h-[41px]">
                        Learn more
                      </button>
                      <Link to="/login">
                        <button className="bg-[#EE4C0C] rounded-[30px] w-[148px] h-[41px] text-stone-50 font-medium">
                          Login
                        </button>
                      </Link>
                    </div>
                  </>
                )}
                {/* Search Content */}
                {logged && (
                  <>
                    <p className="text-[22px] font-crimson px-[0px] text-[#585147]">
                      Type in your ingredients to discover new recipes
                    </p>

                    {/* Search Input */}
                    <div className="flex flex-col items-center mt-[40px]">
                      {errorSuggestionMessage && (
                        <div className="text-red-600 pb-2 -mt-6">
                          {errorSuggestionMessage}
                        </div>
                      )}
                      <div className="flex items-center bg-[#EEA47F] rounded-full px-4 py-2 w-full max-w-[500px]">
                        <input
                          ref={inputRef}
                          type="text"
                          placeholder="Search for ingredients"
                          value={value}
                          onBlur={() => setSuggestionOpen(false)}
                          onFocus={() => setSuggestionOpen(true)}
                          onChange={(e) => setValue(e.target.value)}
                          onKeyDown={handleKeyDown}
                          className="bg-transparent outline-none text-[#34322F] pl-6 flex-grow placeholder:text-[#504535] placeholder:font-light text-[15px]"
                        />
                        <button
                          onClick={handleSearch}
                          className="text-black pl-[5px] border-l border-[#504535] border-opacity-80"
                        >
                          <img
                            src="../src/assets/icons/search.png"
                            alt=""
                            className="opacity-60"
                          />
                        </button>
                      </div>
                    </div>

                    {/* Suggestion Tab */}
                    <div className="relative">
                      {suggestionOpen && (
                        <div
                          ref={suggestionRef}
                          className="absolute top-1 left-0 w-full bg-white rounded-lg mt-1 z-20 shadow-lg border border-gray-200 overflow-hidden"
                        >
                          {filteredSuggestions.map((item, index) => (
                            <div
                              key={item.ingredient}
                              onMouseDown={(e) => e.preventDefault()}
                              onClick={() => {
                                setValue(item.ingredient);
                                setSuggestionOpen(false);
                                setSelectedIndex(-1);
                              }}
                              className={`p-2 cursor-pointer ${
                                selectedIndex === index
                                  ? "bg-[#EE4C0C] text-white rounded-lg"
                                  : "hover:bg-[#EEA47F]"
                              }`}
                            >
                              {item.ingredient}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Submit & OpenAI buttons */}
                    <div className="flex justify-center mt-[40px] xs:space-x-9 space-x-5">
                      <button
                        onClick={generateRecipes}
                        className="rounded-[30px] border-black border w-[148px] h-[41px]"
                      >
                        Generate Recipes
                      </button>
                      <button className="bg-[#EE4C0C] rounded-[30px] w-[148px] h-[41px] text-stone-50 font-medium">
                        OpenAI
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
            {/* Background Image */}
            <div
              className="xmd:w-2/3 bg-[url('../src/assets/bg_chef_red.png')] xmd:block hidden bg-right-top bg-no-repeat bg-contain"
              id="home"
            ></div>
          </div>
          {/* Bottom Ingredients List */}
          <div className="flex min-h-[40px]">
            <div className="flex flex-wrap space-x-3 ml-5">
              {ingredients.map((item) => (
                <div
                  key={item}
                  className="flex border-[#333030] border-[1px] border-opacity-50 rounded-[20px] px-[10px] py-[2px] mb-4"
                >
                  <p className="text-[#6E6A6A] text-[13px]">{item}</p>
                  <button
                    className="ml-[5px]"
                    onClick={() => {
                      setIngredients(ingredients.filter((i) => i !== item));
                    }}
                  >
                    <img src="../src/assets/icons/exit.png" alt="" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        // Recipe Generation View
        <div className="min-h-screen bg-stone-50">
          {/* Header with profile pic and back button */}
          <div className="px-6 py-4 flex justify-between items-center border-b border-gray-200">
            <div className="flex items-center">
              <button
                onClick={handleBackToIngredients}
                className="mr-4 text-[#EE4C0C] flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                <span className="ml-1">Back</span>
              </button>
              <h1 className="text-3xl font-crimson text-[#EE4C0C]">
                Recipe Finder
              </h1>
            </div>
            <Link to="/profile">
              <img
                src={profilePic}
                alt="Profile"
                className="w-12 h-12 rounded-full"
              />
            </Link>
          </div>

          {/* Main content */}
          <div className="container mx-auto px-4 py-8">
            {/* Ingredients summary */}
            <div className="mb-6">
              <h2 className="text-2xl font-crimson mb-3">Your Ingredients</h2>
              <div className="flex flex-wrap gap-2">
                {ingredients.map((ingredient, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-[#EEA47F] text-[#34322F] rounded-full text-sm"
                  >
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#EE4C0C]"></div>
                <span className="ml-3 text-[#585147]">
                  Generating recipes...
                </span>
              </div>
            ) : error ? (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
                <div className="mt-4">
                  <button
                    onClick={handleBackToIngredients}
                    className="bg-[#EE4C0C] text-white rounded-full px-6 py-2"
                  >
                    Back to Ingredients
                  </button>
                </div>
              </div>
            ) : recipes.length === 0 ? (
              <div className="text-center py-16">
                <h2 className="text-2xl font-crimson mb-4">No Recipes Found</h2>
                <p className="text-gray-600 mb-6">
                  We couldn't find any recipes with your selected ingredients.
                  Try adding different ingredients or fewer restrictions.
                </p>
                <button
                  onClick={handleBackToIngredients}
                  className="bg-[#EE4C0C] text-white rounded-full px-6 py-2"
                >
                  Back to Ingredients
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recipe list (left sidebar on large screens) */}
                <div className="lg:col-span-1 bg-white rounded-lg shadow-md p-4 h-fit">
                  <h2 className="text-2xl font-crimson mb-4">
                    Recipe Suggestions
                  </h2>
                  <div className="space-y-4">
                    {recipes.map((recipe) => (
                      <div
                        key={recipe.id}
                        onClick={() => setActiveRecipe(recipe)}
                        className={`p-3 border rounded-lg cursor-pointer transition-all ${
                          activeRecipe?.id === recipe.id
                            ? "border-[#EE4C0C] bg-[#fff8f6]"
                            : "border-gray-200 hover:border-[#EEA47F]"
                        }`}
                      >
                        <h3 className="font-medium text-lg">{recipe.title}</h3>
                        <div className="flex justify-between text-sm text-gray-600 mt-2">
                          <span>
                            Time: {recipe.prepTime + recipe.cookTime} mins
                          </span>
                          <span>{recipe.difficulty}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recipe detail (right side on large screens) */}
                {activeRecipe && (
                  <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
                    <h1 className="text-3xl font-crimson text-[#34322F] mb-4">
                      {activeRecipe.title}
                    </h1>

                    <div className="flex flex-wrap gap-4 mb-6">
                      <div className="flex items-center gap-2">
                        <span className="text-[#EE4C0C]">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </span>
                        <span>Prep: {activeRecipe.prepTime} mins</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[#EE4C0C]">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </span>
                        <span>Cook: {activeRecipe.cookTime} mins</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[#EE4C0C]">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                          </svg>
                        </span>
                        <span>Serves: {activeRecipe.servings}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[#EE4C0C]">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                            />
                          </svg>
                        </span>
                        <span>
                          {activeRecipe.calories} calories per serving
                        </span>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                      <div>
                        <h2 className="text-xl font-crimson mb-3 text-[#34322F]">
                          Ingredients
                        </h2>
                        <ul className="space-y-2">
                          {activeRecipe.ingredients.map((ingredient, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-[#EE4C0C] mr-2">•</span>
                              <span>{ingredient}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-gray-100 rounded-lg p-4">
                        <h3 className="text-lg font-medium mb-2">
                          Nutrition Facts
                        </h3>
                        <p className="text-sm text-gray-600 mb-1">
                          Calories: {activeRecipe.calories} kcal
                        </p>
                        <p className="text-sm text-gray-600 mb-1">
                          Protein: 24g
                        </p>
                        <p className="text-sm text-gray-600 mb-1">Carbs: 48g</p>
                        <p className="text-sm text-gray-600">Fat: 16g</p>
                        <div className="mt-4 text-xs text-gray-500">
                          *Approximate values per serving
                        </div>
                      </div>
                    </div>

                    <div className="mb-8">
                      <h2 className="text-xl font-crimson mb-3 text-[#34322F]">
                        Instructions
                      </h2>
                      <ol className="space-y-4">
                        {activeRecipe.instructions.map((step, index) => (
                          <li key={index} className="flex">
                            <span className="bg-[#EE4C0C] text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                              {index + 1}
                            </span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    <div className="mt-8 flex flex-wrap gap-4 justify-between items-center">
                      <button className="bg-white border border-[#EE4C0C] text-[#EE4C0C] px-6 py-2 rounded-full flex items-center gap-2 hover:bg-[#fff8f6] transition-colors">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                        Save Recipe
                      </button>
                      <button className="bg-[#EE4C0C] text-white px-6 py-2 rounded-full flex items-center gap-2 hover:bg-[#d4410b] transition-colors">
                        Generate Shopping List
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
