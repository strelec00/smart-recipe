package com.rwt.SmartRecipe.controller;

import com.rwt.SmartRecipe.dto.user.*;
import com.rwt.SmartRecipe.service.AuthenticationService;
import com.rwt.SmartRecipe.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.xml.bind.ValidationException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:5173")  // Allow frontend
@RestController
@RequestMapping("/api")
public class UserController {

    private final UserService userService;
    private final AuthenticationService authenticationService;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserController(UserService userService, AuthenticationService authenticationService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.authenticationService = authenticationService;
        this.passwordEncoder = passwordEncoder;
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

    @PostMapping("users/auth/register")
    public ResponseEntity<UserDTO> signUp(
            @Valid @RequestBody final UserSignUpRequestDTO userSignUpRequest) {
        UserDTO user = new UserDTO(
                null,
                userSignUpRequest.getUsername(),
                userSignUpRequest.getEmail(),
                passwordEncoder.encode(userSignUpRequest.getPassword()),
                userSignUpRequest.getFirstName(),
                userSignUpRequest.getLastName(),
                null
        );

        try {
            return ResponseEntity.ok(userService.createUser(user));
        } catch (ValidationException e) {
            throw new RuntimeException(e);
        }
    }

    @PostMapping("users/auth/login")
    public ResponseEntity<AuthenticationResponseDTO> logIn(
            @RequestBody final UserLogInRequestDTO userLogIn) {
        return ResponseEntity.ok(authenticationService.authenticate(userLogIn));
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
