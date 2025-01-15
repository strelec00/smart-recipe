package com.rwt.SmartRecipe.repository;

import com.rwt.SmartRecipe.dto.recipe.FavouriteRecipeDTO;
import com.rwt.SmartRecipe.model.FavouriteRecipe;
import com.rwt.SmartRecipe.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface FavouriteRecipeRepository extends JpaRepository<FavouriteRecipe, UUID> {

    List<FavouriteRecipe> getFavouriteRecipeByUser(User user);
}
