package com.rwt.SmartRecipe.dto.recipe;

import com.rwt.SmartRecipe.dto.user.UserDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FavouriteRecipeDTO {

    private UUID id;

    private RecipeDTO recipe;

    private UserDTO user;
}
