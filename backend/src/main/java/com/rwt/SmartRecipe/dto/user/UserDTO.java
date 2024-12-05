package com.rwt.SmartRecipe.dto.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {

    private UUID id;

    private String username;

    private String email;

    private String password;

    private String firstName;

    private String lastName;

    private String profileImageUrl;
}
