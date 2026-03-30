package com.movieapp.backend.repository;

import com.movieapp.backend.domain.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long>, JpaSpecificationExecutor<User> {
    boolean existsByEmail(String email);

    boolean existsByUsername(String username);

    User findByUsername(String username);

    User findByRefreshTokenAndUsername(String token, String username);
}