package com.rwt.SmartRecipe.dto.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserCredentialUpdateRequestDTO {

    private String firstName;

    private String lastName;

}
