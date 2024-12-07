package com.rwt.SmartRecipe.dto.recipe;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RecipeCreationRequestDTO {

    @NotNull(message = "Title is required")
    @Size(min = 3, message = "Title is too short")
    @Size(max = 255, message = "Title is too long")
    private String title;

    private String image;

    @NotNull(message = "Ingredient list is required")
    private List<String> ingredients;

    @NotNull(message = "The steps for the recipe are required")
    private String steps;

    private List<String> tags;
}
