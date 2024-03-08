package com.example.demo.controllers;

import com.example.demo.dto.TokenResponseDTO;
import com.example.demo.dto.UserDTO;
import com.example.demo.entities.User;
import com.example.demo.service.IUserService;
import com.example.demo.utils.JWTUtil;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final IUserService userService;
    private final JWTUtil jwtUtil;

    public AuthController(IUserService userService, JWTUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<String> handleValidationException(MethodArgumentNotValidException ex) {
        String errorMessage = ex.getBindingResult().getFieldErrors().get(0).getDefaultMessage();
        return ResponseEntity.badRequest().body("Validation error: " + errorMessage);
    }
    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody UserDTO userDTO){
        if(userService.emailExists(userDTO.getEmail())){
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email is already in use");
        }
        LocalDate currentDate = LocalDate.now();
        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        String hash = argon2.hash(1, 1024, 1, userDTO.getPassword());
        User user = User.builder()
                .userName(userDTO.getUserName())
                .email(userDTO.getEmail())
                .password(hash)
                .createdOn(currentDate)
                .isActive(true)
                .build();
        userService.save(user);
        return ResponseEntity.ok("User registered successfully");
    }
    @PostMapping("/login/{email}/{password}")
    @ResponseBody
    public ResponseEntity<?> login(@PathVariable String email, @PathVariable String password) {
        Optional<User> userOptional = userService.findByUsernameAndPassword(email);
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
        User user = userOptional.get();
        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        if (argon2.verify(user.getPassword(), password)) {
            String tokenJwt = jwtUtil.create(String.valueOf(user.getUserId()), user.getEmail());
            TokenResponseDTO tokenResponse = new TokenResponseDTO(tokenJwt, user.getUserId().toString());
            return ResponseEntity.ok(tokenResponse);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Incorrect password");
    }
}
