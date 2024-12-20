package com.rwt.SmartRecipe.repository;

import com.rwt.SmartRecipe.model.Recipe;
import com.rwt.SmartRecipe.model.Review;
import com.rwt.SmartRecipe.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface ReviewRepository extends JpaRepository<Review, UUID> {

    Optional<Review> findByReviewedRecipe(Recipe reviewedRecipe);
    Optional<Review> findByCreatedBy(User createdBy);
}
