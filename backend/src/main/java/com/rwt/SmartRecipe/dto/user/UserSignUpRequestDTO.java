package com.rwt.SmartRecipe.dto.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserSignUpRequestDTO {

    @NotNull(message = "Username is required")
    @Size(min = 3, message = "Username is too short")
    @Size(max = 255, message = "Username is too long")
    private String username;

    @NotNull(message = "Email is mandatory")
    @Email(message = "Email is invalid")
    private String email;

    @NotNull(message = "Password is mandatory")
    private String password;

    @NotNull(message = "First name is required")
    @Size(max = 255, message = "First name is too long")
    private String firstName;

    @NotNull(message = "Last name is required")
    @Size(max = 255, message = "Last name is too long")
    private String lastName;

}
