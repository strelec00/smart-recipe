package com.rwt.SmartRecipe.dto.review;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReviewCreationRequestDTO {

    private String title;

    private String content;

    private Float score;

}
