package com.rwt.SmartRecipe.repository;

import com.rwt.SmartRecipe.model.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, UUID> {

    Optional<Recipe> findByTitle(String title);

//    Optional<Recipe> findByTags(String tags);
}
