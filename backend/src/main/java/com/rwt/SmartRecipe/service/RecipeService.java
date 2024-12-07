package com.rwt.SmartRecipe.service;


import com.rwt.SmartRecipe.dto.recipe.RecipeDTO;
import com.rwt.SmartRecipe.model.Recipe;

import java.util.List;
import java.util.UUID;

public interface RecipeService {

    RecipeDTO recipeToDTO(Recipe recipe);

    Recipe recipeDTOtoEntity(RecipeDTO recipeDTO);

    List<RecipeDTO> getAllRecipes();

    RecipeDTO getRecipeById(UUID id);

    RecipeDTO getRecipeByTitle(String title);

    List<RecipeDTO> getRecipesByTags(List<String> tags);

    RecipeDTO createRecipe(RecipeDTO recipeDTO, UUID creatorId);

    RecipeDTO updateRecipe(RecipeDTO recipeDTO, UUID id);

    void deleteRecipe(UUID id);
}
