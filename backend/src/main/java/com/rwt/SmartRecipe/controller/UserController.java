package com.rwt.SmartRecipe.controller;

import com.rwt.SmartRecipe.dto.user.UserDTO;
import com.rwt.SmartRecipe.dto.user.UserSignUpRequestDTO;
import com.rwt.SmartRecipe.dto.user.UserCredentialUpdateRequestDTO;
import com.rwt.SmartRecipe.service.UserService;
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
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users")
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable UUID id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    @GetMapping("users/email/{email}")
    public ResponseEntity<UserDTO> getUserByEmail(@PathVariable String email) {
        return ResponseEntity.ok(userService.getUserByEmail(email));
    }

    @PostMapping("users/create")
    public ResponseEntity<UserDTO> signUp(
            @Valid @RequestBody UserSignUpRequestDTO userSignUpRequest) {
        UserDTO user = new UserDTO(
                null,
                userSignUpRequest.getUsername(),
                userSignUpRequest.getEmail(),
                userSignUpRequest.getPassword(),
                userSignUpRequest.getFirstName(),
                userSignUpRequest.getLastName(),
                userSignUpRequest.getProfileImageUrl()
        );

        return ResponseEntity.ok(userService.createUser(user));
    }

    @PutMapping("/users/credentials/{id}")
    public ResponseEntity<UserDTO> updateUserCredentials(
            @PathVariable UUID id,
            @Valid @RequestBody UserCredentialUpdateRequestDTO userUpdateRequest
            ) {
        UserDTO user = userService.getUserById(id);
        user.setFirstName(userUpdateRequest.getFirstName());
        user.setLastName(userUpdateRequest.getLastName());

        return ResponseEntity.ok(userService.updateUser(user, id));
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<Map<String, Object>> removeUser(@PathVariable UUID id) {
        userService.deleteUser(id);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "User deleted successfully");
        return ResponseEntity.ok(response);
    }
}
