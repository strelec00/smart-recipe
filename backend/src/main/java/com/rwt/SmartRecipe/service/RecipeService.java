package com.rwt.SmartRecipe.service;


import com.rwt.SmartRecipe.dto.recipe.FavouriteRecipeDTO;
import com.rwt.SmartRecipe.dto.recipe.RecipeDTO;
import com.rwt.SmartRecipe.dto.user.UserDTO;
import com.rwt.SmartRecipe.model.FavouriteRecipe;
import com.rwt.SmartRecipe.model.Recipe;

import java.util.List;
import java.util.UUID;

public interface RecipeService {

    RecipeDTO recipeToDTO(Recipe recipe);

    Recipe recipeDTOtoEntity(RecipeDTO recipeDTO);

    FavouriteRecipeDTO favRecipeToDTO(FavouriteRecipe favouriteRecipe);

    FavouriteRecipe favRecipeDTOtoEntity(FavouriteRecipeDTO favouriteRecipeDTO);

    List<RecipeDTO> getAllRecipes();

    RecipeDTO getRecipeById(UUID id);

    RecipeDTO getRecipeByTitle(String title);

    public List<RecipeDTO> getUsersFavRecipes(UserDTO userDTO);

//    List<RecipeDTO> getRecipesByTag(String tag);

    RecipeDTO createRecipe(RecipeDTO recipeDTO, UUID creatorId);

    FavouriteRecipeDTO favouriteRecipe(FavouriteRecipeDTO favouriteRecipeDTO);

    RecipeDTO updateRecipe(RecipeDTO recipeDTO, UUID id);

    void deleteRecipe(UUID id);
}
