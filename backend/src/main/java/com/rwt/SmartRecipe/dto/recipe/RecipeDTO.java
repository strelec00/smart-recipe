package com.rwt.SmartRecipe.dto.recipe;

import com.rwt.SmartRecipe.dto.user.UserDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RecipeDTO {

    private UUID id;

    private UserDTO creator;

    private String title;

    private String image;

    private List<String> ingredients;

    private String steps;

    private List<String> tags;
}
