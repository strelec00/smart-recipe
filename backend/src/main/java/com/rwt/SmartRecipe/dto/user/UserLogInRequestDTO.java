package com.rwt.SmartRecipe.dto.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserLogInRequestDTO {

    @NotNull(message = "Email is mandatory")
    @Email(message = "Email is invalid")
    private String email;

    @NotNull(message = "Password is mandatory")
    private String password;
}
