package com.rwt.SmartRecipe.controller;

import com.rwt.SmartRecipe.dto.recipe.FavouriteRecipeDTO;
import com.rwt.SmartRecipe.dto.recipe.RecipeCreationRequestDTO;
import com.rwt.SmartRecipe.dto.recipe.RecipeDTO;
import com.rwt.SmartRecipe.dto.user.UserDTO;
import com.rwt.SmartRecipe.repository.FavouriteRecipeRepository;
import com.rwt.SmartRecipe.service.RecipeService;
import com.rwt.SmartRecipe.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api")
public class RecipeController {

    private final RecipeService recipeService;
    private final UserService userService;
    private final FavouriteRecipeRepository favouriteRecipeRepository;

    @Autowired
    public RecipeController(RecipeService recipeService,
                            UserService userService,
                            FavouriteRecipeRepository favouriteRecipeRepository) {
        this.recipeService = recipeService;
        this.userService = userService;
        this.favouriteRecipeRepository = favouriteRecipeRepository;
    }

    @GetMapping("/recipe")
    private ResponseEntity<List<RecipeDTO>> getAllRecipes() {
        return ResponseEntity.ok(recipeService.getAllRecipes());
    }

    @GetMapping("/recipe/{id}")
    private ResponseEntity<RecipeDTO> getRecipeById(@PathVariable UUID id) {
        return ResponseEntity.ok(recipeService.getRecipeById(id));
    }

    @GetMapping("/recipe/title{title}")
    private ResponseEntity<RecipeDTO> getRecipeByTitle(@PathVariable String title) {
        return ResponseEntity.ok(recipeService.getRecipeByTitle(title));
    }

//    @GetMapping("/recipe/tags/{tag}")
//    private ResponseEntity<List<RecipeDTO>> getRecipesByTag(@PathVariable String tag) {
//        return ResponseEntity.ok(recipeService.getRecipesByTag(tag));
//    }

    @GetMapping("/recipe/favourite/{userId}")
    private ResponseEntity<List<RecipeDTO>> getUsersFavouriteRecipes(@PathVariable UUID userId) {
        UserDTO user = userService.getUserById(userId);

        return ResponseEntity.ok(recipeService.getUsersFavRecipes(user));
    }

    @PostMapping("/recipe/create/{creatorId}")
    private ResponseEntity<RecipeDTO> createRecipe(
            @Valid @RequestBody RecipeCreationRequestDTO recipeCreationRequestDTO,
            @PathVariable UUID creatorId
            ) {
        RecipeDTO recipe = new RecipeDTO();
        recipe.setTitle(recipeCreationRequestDTO.getTitle());
        recipe.setImage(recipeCreationRequestDTO.getImage());
        recipe.setIngredients(recipeCreationRequestDTO.getIngredients());
        recipe.setSteps(recipeCreationRequestDTO.getSteps());
        recipe.setTags(recipeCreationRequestDTO.getTags());

        return ResponseEntity.ok(recipeService.createRecipe(recipe, creatorId));
    }

    @PostMapping("/recipe/favourite/{recipeId}/{userId}")
    private ResponseEntity<FavouriteRecipeDTO> favouriteRecipe(
            @PathVariable UUID recipeId, @PathVariable UUID userId
    ) {
        FavouriteRecipeDTO favRecipe = new FavouriteRecipeDTO();
        favRecipe.setRecipe(recipeService.getRecipeById(recipeId));
        favRecipe.setUser(userService.getUserById(userId));

        return ResponseEntity.ok(recipeService.favouriteRecipe(favRecipe));
    }

    @DeleteMapping("/recipe/delete/{id}")
    private ResponseEntity<Map<String, Object>> deleteRecipe(@PathVariable UUID id) {
        recipeService.deleteRecipe(id);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Recipe deleted successfully");
        return ResponseEntity.ok(response);
    }
}
