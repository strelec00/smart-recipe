package com.rwt.SmartRecipe.controller;

import com.rwt.SmartRecipe.dto.recipe.RecipeCreationRequestDTO;
import com.rwt.SmartRecipe.dto.recipe.RecipeDTO;
import com.rwt.SmartRecipe.service.RecipeService;
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

    @Autowired
    public RecipeController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    @GetMapping("/recipe")
    private ResponseEntity<List<RecipeDTO>> getAllRecipes() {
        return ResponseEntity.ok(recipeService.getAllRecipes());
    }

    @GetMapping("/recipe/{id}")
    private ResponseEntity<RecipeDTO> getRecipeById(@PathVariable UUID id) {
        return ResponseEntity.ok(recipeService.getRecipeById(id));
    }

    @GetMapping("/recipe/{title}")
    private ResponseEntity<RecipeDTO> getRecipeByTitle(@PathVariable String title) {
        return ResponseEntity.ok(recipeService.getRecipeByTitle(title));
    }

    @GetMapping("/recipe/tags")
    private ResponseEntity<List<RecipeDTO>> getRecipesByTags(
            @Valid @RequestBody List<String> tags) {
        return ResponseEntity.ok(recipeService.getRecipesByTags(tags));
    }

    @PostMapping("/recipe/create{creatorId}")
    private ResponseEntity<RecipeDTO> createRecipe(
            @Valid @RequestBody RecipeCreationRequestDTO recipeCreationRequestDTO,
            @PathVariable UUID creatorId
            ) {
        RecipeDTO recipe = new RecipeDTO();
        recipe.setTitle(recipeCreationRequestDTO.getTitle());
        recipe.setImage(recipeCreationRequestDTO.getImage());
        recipe.setSteps(recipeCreationRequestDTO.getSteps());
        recipe.setTags(recipeCreationRequestDTO.getTags());

        return ResponseEntity.ok(recipeService.createRecipe(recipe, creatorId));
    }

    @DeleteMapping("/recipe/delete/{id}")
    private ResponseEntity<Map<String, Object>> deleteRecipe(@PathVariable UUID id) {
        recipeService.deleteRecipe(id);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Recipe deleted successfully");
        return ResponseEntity.ok(response);
    }
}
