package com.rwt.SmartRecipe.service;

import com.rwt.SmartRecipe.dto.review.ReviewDTO;
import com.rwt.SmartRecipe.model.Review;

import java.util.List;
import java.util.UUID;

public interface ReviewService {

    ReviewDTO reviewToDTO(Review review);

    Review reviewDTOtoEntity(ReviewDTO reviewDTO);

    List<ReviewDTO> getAllReviews();

    ReviewDTO getReviewById(UUID id);

    List<ReviewDTO> getReviewsByRecipe(UUID recipeId);

    List<ReviewDTO> getReviewsByCreator(UUID creatorId);

    ReviewDTO createReview(ReviewDTO reviewDTO, UUID recipeId, UUID creatorId);

    ReviewDTO updateReview(ReviewDTO reviewDTO, UUID id);

    void deleteReview(UUID id);
}
