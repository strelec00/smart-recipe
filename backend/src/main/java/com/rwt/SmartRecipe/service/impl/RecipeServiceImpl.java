package com.rwt.SmartRecipe.service.impl;

import com.rwt.SmartRecipe.dto.recipe.FavouriteRecipeDTO;
import com.rwt.SmartRecipe.dto.recipe.RecipeDTO;
import com.rwt.SmartRecipe.dto.user.UserDTO;
import com.rwt.SmartRecipe.model.FavouriteRecipe;
import com.rwt.SmartRecipe.model.Recipe;
import com.rwt.SmartRecipe.repository.FavouriteRecipeRepository;
import com.rwt.SmartRecipe.repository.RecipeRepository;
import com.rwt.SmartRecipe.service.RecipeService;
import com.rwt.SmartRecipe.service.UserService;
import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional
public class RecipeServiceImpl implements RecipeService {

    private final RecipeRepository recipeRepository;
    private final FavouriteRecipeRepository favouriteRecipeRepository;
    private final UserService userService;
    private final ModelMapper modelMapper;

    @Autowired
    public RecipeServiceImpl(RecipeRepository recipeRepository,
                             FavouriteRecipeRepository favouriteRecipeRepository,
                             UserService userService,
                             ModelMapper modelMapper) {
        this.recipeRepository = recipeRepository;
        this.favouriteRecipeRepository = favouriteRecipeRepository;
        this.userService = userService;
        this.modelMapper = modelMapper;
    }

    @Override
    public RecipeDTO recipeToDTO(Recipe recipe) {
        return modelMapper.map(recipe, RecipeDTO.class);
    }

    @Override
    public Recipe recipeDTOtoEntity(RecipeDTO recipeDTO) {
        return modelMapper.map(recipeDTO, Recipe.class);
    }

    @Override
    public FavouriteRecipeDTO favRecipeToDTO(FavouriteRecipe favouriteRecipe) {
        return modelMapper.map(favouriteRecipe, FavouriteRecipeDTO.class);
    }

    @Override
    public FavouriteRecipe favRecipeDTOtoEntity(FavouriteRecipeDTO favouriteRecipeDTO) {
        return modelMapper.map(favouriteRecipeDTO, FavouriteRecipe.class);
    }

    @Override
    public List<RecipeDTO> getAllRecipes() {
        return recipeRepository.findAll().stream().map(this::recipeToDTO).collect(Collectors.toList());
    }

    @Override
    public RecipeDTO getRecipeById(UUID id) {
        return recipeRepository.findById(id).map(this::recipeToDTO).orElseThrow(() ->
                new EntityNotFoundException("Couldn't find recipe"));
    }

    @Override
    public RecipeDTO getRecipeByTitle(String title) {
        return recipeRepository.findByTitle(title).map(this::recipeToDTO).orElseThrow(() ->
                new EntityNotFoundException("Couldn't find recipe by this title"));
    }

    @Override
    public List<RecipeDTO> getUsersFavRecipes(UserDTO userDTO) {
       List<FavouriteRecipeDTO> favRecipes = favouriteRecipeRepository.
               getFavouriteRecipeByUser(userService.userDTOtoEntity(userDTO)).stream().map(this::favRecipeToDTO).toList();

        return favRecipes.stream().map(FavouriteRecipeDTO::getRecipe).collect(Collectors.toList());
    }

//    @Override
//    public List<RecipeDTO> getRecipesByTag(String tag) {
//        return recipeRepository.findByTags(tag).stream().map(this::recipeToDTO).collect(Collectors.toList());
//    }

    @Override
    public RecipeDTO createRecipe(RecipeDTO recipeDTO, UUID creatorId) {
        recipeDTO.setCreator(userService.getUserById(creatorId));
        return recipeToDTO(recipeRepository.save(recipeDTOtoEntity(recipeDTO)));
    }

    @Override
    public FavouriteRecipeDTO favouriteRecipe(FavouriteRecipeDTO favouriteRecipeDTO) {
        return favRecipeToDTO(favouriteRecipeRepository.save(favRecipeDTOtoEntity(favouriteRecipeDTO)));
    }

    @Override
    public RecipeDTO updateRecipe(RecipeDTO recipeDTO, UUID id) {
        if (!recipeRepository.existsById(id)) {
            throw new EntityNotFoundException("Recipe not found");
        }

        return recipeToDTO(recipeRepository.save(recipeDTOtoEntity(recipeDTO)));
    }

    @Override
    public void deleteRecipe(UUID id) {
        if (!recipeRepository.existsById(id)) {
            throw new EntityNotFoundException("User not found");
        }

        recipeRepository.deleteById(id);
    }
}
