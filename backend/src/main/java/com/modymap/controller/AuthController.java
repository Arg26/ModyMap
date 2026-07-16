package com.modymap.controller;

import com.modymap.dto.LoginRequest;
import com.modymap.dto.LoginResponse;

import com.modymap.dto.RegisterRequest;

import com.modymap.service.AuthService;

import org.springframework.web.bind.annotation.*;
import com.modymap.dto.RegisterRequest;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public LoginResponse login(
            @RequestBody LoginRequest request
    ) {

        return authService.login(request);
    }

    @PostMapping("/register")
        public ResponseEntity<String> register(
                @RequestBody RegisterRequest request
        ) {

        authService.register(request);

        return ResponseEntity.ok("Registration successful");
        }

}