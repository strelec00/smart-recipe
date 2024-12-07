package com.rwt.SmartRecipe.repository;

import com.rwt.SmartRecipe.model.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, UUID> {

    Optional<Recipe> findByCreator(UUID creatorId);

    Optional<Recipe> findByTitle(String title);

    Optional<Recipe> findByTags(List<String> tags);
}
