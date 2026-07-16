package com.modymap.service;

import com.modymap.dto.LoginRequest;
import com.modymap.dto.LoginResponse;
import com.modymap.entity.User;
import com.modymap.repository.UserRepository;
import com.modymap.util.JwtUtil;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;
import com.modymap.dto.RegisterRequest;
import org.springframework.security.crypto.password.PasswordEncoder;

@Service
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    public AuthService(
            AuthenticationManager authenticationManager,
            UserRepository userRepository,
            JwtUtil jwtUtil,
            PasswordEncoder passwordEncoder) {

        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
    }

    public LoginResponse login(LoginRequest request) {

        try {

            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );

            System.out.println("Authentication successful!");

        } catch (Exception e) {

            System.out.println("Authentication failed:");
            e.printStackTrace();

            throw e;
        }

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow();

        String token = jwtUtil.generateToken(user.getEmail());

        return new LoginResponse(
                token,
                user.getRole(),
                user.getName()
        );
    }

    public void register(RegisterRequest request) {

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists.");
        }

        User user = new User();

        user.setName(
                request.getFirstName() + " " + request.getLastName()
        );

        user.setEmail(request.getEmail());

        user.setPassword(
                passwordEncoder.encode(request.getPassword())
        );

        user.setRole("STUDENT");

        userRepository.save(user);
    }
}