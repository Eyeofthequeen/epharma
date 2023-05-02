package com.example.appepharma.security;

import org.springframework.stereotype.Component;

import java.util.UUID;
import java.util.Date;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;

@Component
public class JwtToken {
    private final String issuer = "epharmaapp";
    private final Algorithm algorithm = Algorithm.HMAC256("verysecrtkey");
    private final JWTVerifier verifier = JWT.require(algorithm).withIssuer(issuer).build();

    // Generate a JWT token
    public String generateToken(String username) {
        return JWT.create()
        .withIssuer(issuer)
        .withSubject("Epharma Details")
        .withClaim("username", username)
        .withIssuedAt(new Date())
        .withExpiresAt(new Date(System.currentTimeMillis() + 86400000L))
        .withJWTId(UUID.randomUUID().toString())
        .withNotBefore(new Date(System.currentTimeMillis() + 1000L))
        .sign(algorithm);
    }

    // Allows to validate the JWT token
    public boolean tokenIsValid(String token) {
        try {
            verifier.verify(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public String getUsername(String token) {
        return JWT.decode(token).getClaim("username").asString();
    }
}
