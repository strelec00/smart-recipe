package com.rwt.SmartRecipe.repository;

import com.rwt.SmartRecipe.dto.recipe.RecipeDTO;
import com.rwt.SmartRecipe.dto.review.ReviewDTO;
import com.rwt.SmartRecipe.dto.user.UserDTO;
import com.rwt.SmartRecipe.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface ReviewRepository extends JpaRepository<Review, UUID> {

    Optional<Review> findByReviewedRecipe(RecipeDTO recipe);
    Optional<Review> findByCreatedBy(UserDTO createdBy);
}
