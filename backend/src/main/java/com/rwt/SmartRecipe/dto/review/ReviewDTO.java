package com.rwt.SmartRecipe.dto.review;

import com.rwt.SmartRecipe.dto.recipe.RecipeDTO;
import com.rwt.SmartRecipe.dto.user.UserDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ReviewDTO {

    private UUID id;

    private String title;

    private String content;

    private Float score;

    private Date createdAt;

    private Integer upvotes;

    private UserDTO createdBy;

    private RecipeDTO reviewedRecipe;
}
