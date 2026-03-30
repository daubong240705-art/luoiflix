package com.movieapp.backend.util;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.stereotype.Service;

import com.movieapp.backend.dto.auth.ResLoginDTO;
import com.nimbusds.jose.util.Base64;

@Service
public class SecurityUtil {

    private final JwtEncoder jwtEncoder;

    public static final MacAlgorithm JWT_ALGORITHM = MacAlgorithm.HS512;

    public SecurityUtil(JwtEncoder jwtEncoder) {
        this.jwtEncoder = jwtEncoder;
    }

    @Value("${movieapp.jwt.secret}")
    private String jwtKey;

    @Value("${movieapp.jwt.access-token}")
    private long accessTokenExpiration;

    @Value("${movieapp.jwt.refresh-token}")
    private long refreshTokenExpiration;

    public String createAccessToken(String username, ResLoginDTO res) {

        Instant now = Instant.now();
        Instant validity = now.plus(this.accessTokenExpiration, ChronoUnit.SECONDS);

        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuedAt(now)
                .expiresAt(validity)
                .subject(username)
                .claim("user", res.getUser())
                .claim("authorities", List.of(res.getUser().getRole()))
                .claim("type", "access")
                .build();

        JwsHeader jwsHeader = JwsHeader.with(JWT_ALGORITHM).build();

        return jwtEncoder
                .encode(JwtEncoderParameters.from(jwsHeader, claims))
                .getTokenValue();
    }

    public String createRefreshToken(String username, ResLoginDTO res) {

        Instant now = Instant.now();
        Instant validity = now.plus(this.refreshTokenExpiration, ChronoUnit.SECONDS);

        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuedAt(now)
                .expiresAt(validity)
                .subject(username)
                .claim("user", res.getUser())
                .build();

        JwsHeader jwsHeader = JwsHeader.with(JWT_ALGORITHM).build();

        return jwtEncoder
                .encode(JwtEncoderParameters.from(jwsHeader, claims))
                .getTokenValue();
    }

    public static String getCurrentUserLogin() {
        Authentication authentication = SecurityContextHolder
                .getContext()
                .getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            return null;
        }

        return authentication.getName();
    }

    private SecretKey getSecretKey() {
        byte[] keyBytes = Base64.from(jwtKey).decode();
        return new SecretKeySpec(keyBytes, 0, keyBytes.length, JWT_ALGORITHM.getName());
    }

    public Jwt checkValidRefreshToken(String token) {
        NimbusJwtDecoder jwtDecoder = NimbusJwtDecoder.withSecretKey(getSecretKey())
                .macAlgorithm(SecurityUtil.JWT_ALGORITHM)
                .build();
        try {
            return jwtDecoder.decode(token);
        } catch (Exception e) {
            System.out.println(">>> Lỗi giải mã JWT: " + e.getMessage());
            throw e;
        }
    }
}