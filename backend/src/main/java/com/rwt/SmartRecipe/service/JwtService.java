package com.rwt.SmartRecipe.service;

import lombok.AllArgsConstructor;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;

import java.time.Duration;
import java.time.Instant;

@AllArgsConstructor
public class JwtService {

    private final String issuer;

    private Duration ttl;

    private final JwtEncoder jwtEncoder;

    public String generateToken(final String email) {
        final var claimsSet = JwtClaimsSet.builder()
                .subject(email)
                .issuer(issuer)
                .expiresAt(Instant.now().plus(ttl))
                .build();

        return jwtEncoder.encode(JwtEncoderParameters.from(claimsSet))
                .getTokenValue();
    }
}
