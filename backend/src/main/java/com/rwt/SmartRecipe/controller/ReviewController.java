package com.rwt.SmartRecipe.controller;

import com.rwt.SmartRecipe.dto.review.ReviewCreationRequestDTO;
import com.rwt.SmartRecipe.dto.review.ReviewDTO;
import com.rwt.SmartRecipe.service.ReviewService;
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
public class ReviewController {

    private final ReviewService reviewService;

    @Autowired
    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @GetMapping("/review")
    private ResponseEntity<List<ReviewDTO>> getAllReviews() {
        return ResponseEntity.ok(reviewService.getAllReviews());
    }

    @GetMapping("/review/{id}")
    private ResponseEntity<ReviewDTO> getReviewById(@PathVariable UUID id) {
        return ResponseEntity.ok(reviewService.getReviewById(id));
    }

    @GetMapping("/review/recipe/{id}")
    private ResponseEntity<List<ReviewDTO>> getReviewsByRecipe(@PathVariable UUID id) {
        return ResponseEntity.ok(reviewService.getReviewsByRecipe(id));
    }

    @GetMapping("/review/creator/{id}")
    private ResponseEntity<List<ReviewDTO>> getReviewsByCreator(@PathVariable UUID id) {
        return ResponseEntity.ok(reviewService.getReviewsByCreator(id));
    }

    @PostMapping("/review/create/{creatorId}/{recipeId}")
    private ResponseEntity<ReviewDTO> createReview(
            @Valid @RequestBody ReviewCreationRequestDTO request,
            @PathVariable UUID creatorId, @PathVariable UUID recipeId
            ) {
        ReviewDTO review = new ReviewDTO();
        review.setTitle(request.getTitle());
        review.setContent(request.getContent());
        review.setScore(request.getScore());
        review.setUpvotes(0);

        return ResponseEntity.ok(reviewService.createReview(review, recipeId, creatorId));
    }

    @DeleteMapping("/review/delete/{id}")
    private ResponseEntity<Map<String, Object>> deleteReview(@PathVariable UUID id) {
        reviewService.deleteReview(id);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Review deleted successfully");
        return ResponseEntity.ok(response);
    }
}
