package com.rwt.SmartRecipe.service.impl;

import com.rwt.SmartRecipe.dto.recipe.RecipeDTO;
import com.rwt.SmartRecipe.dto.review.ReviewDTO;
import com.rwt.SmartRecipe.model.Review;
import com.rwt.SmartRecipe.repository.ReviewRepository;
import com.rwt.SmartRecipe.service.RecipeService;
import com.rwt.SmartRecipe.service.ReviewService;
import com.rwt.SmartRecipe.service.UserService;
import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;
    private final RecipeService recipeService;
    private final UserService userService;
    private final ModelMapper modelMapper;

    public ReviewServiceImpl(ReviewRepository reviewRepository,
                             RecipeService recipeService,
                             UserService userService,
                             ModelMapper modelMapper) {
        this.reviewRepository = reviewRepository;
        this.recipeService = recipeService;
        this.userService = userService;
        this.modelMapper = modelMapper;
    }

    @Override
    public ReviewDTO reviewToDTO(Review review) {
        return modelMapper.map(review, ReviewDTO.class);
    }

    @Override
    public Review reviewDTOtoEntity(ReviewDTO reviewDTO) {
        return modelMapper.map(reviewDTO, Review.class);
    }

    @Override
    public List<ReviewDTO> getAllReviews() {
        return reviewRepository.findAll().stream().map(this::reviewToDTO).collect(Collectors.toList());
    }

    @Override
    public ReviewDTO getReviewById(UUID id) {
        return reviewRepository.findById(id).map(this::reviewToDTO).orElseThrow(() ->
                new EntityNotFoundException("Couldn't find review"));
    }

    @Override
    public List<ReviewDTO> getReviewsByRecipe(UUID recipeId) {
        return reviewRepository.findByReviewedRecipe(recipeService.getRecipeById(recipeId)).stream().map(this::reviewToDTO).collect(Collectors.toList());
    }

    @Override
    public List<ReviewDTO> getReviewsByCreator(UUID creatorId) {
        return reviewRepository.findByCreatedBy(userService.getUserById(creatorId)).stream().map(this::reviewToDTO).collect(Collectors.toList());
    }

    @Override
    public ReviewDTO createReview(ReviewDTO reviewDTO, UUID recipeId, UUID creatorId) {
        reviewDTO.setReviewedRecipe(recipeService.getRecipeById(recipeId));
        reviewDTO.setCreatedBy(userService.getUserById(creatorId));
        return reviewToDTO(reviewRepository.save(reviewDTOtoEntity(reviewDTO)));
    }

    @Override
    public ReviewDTO updateReview(ReviewDTO reviewDTO, UUID id) {
        if (!reviewRepository.existsById(id)) {
            throw new EntityNotFoundException("Review not found");
        }

        return reviewToDTO(reviewRepository.save(reviewDTOtoEntity(reviewDTO)));
    }

    @Override
    public void deleteReview(UUID id) {
        if (!reviewRepository.existsById(id)) {
            throw new EntityNotFoundException("Review not found");
        }

        reviewRepository.deleteById(id);
    }
}
