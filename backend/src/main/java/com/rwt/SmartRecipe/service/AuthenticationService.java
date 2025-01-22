package com.rwt.SmartRecipe.service;

import com.rwt.SmartRecipe.dto.user.AuthenticationResponseDTO;
import com.rwt.SmartRecipe.dto.user.UserLogInRequestDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    @Autowired
    public AuthenticationService(AuthenticationManager authenticationManager, JwtService jwtService) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    public AuthenticationResponseDTO authenticate(final UserLogInRequestDTO request) {

        final var authToken = UsernamePasswordAuthenticationToken
                .unauthenticated(request.getUsername(), request.getPassword());

        final var authentication = authenticationManager
                .authenticate(authToken);

        final var token = jwtService.generateToken(request.getUsername());
        return new AuthenticationResponseDTO(token);
    }
}
