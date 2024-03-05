package com.example.demo.controllers;

import com.example.demo.dto.UserDTO;
import com.example.demo.entities.User;
import com.example.demo.service.IUserService;
import com.example.demo.utils.JWTUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
public class UserController {
    private final IUserService userService;
    private final JWTUtil jwtUtil;

    public UserController(IUserService userService, JWTUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    private boolean validateToken(String token, Long userIdComparable) {
        String userId = jwtUtil.getId(token);
        return userId.equals(userIdComparable.toString());
    }
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<String> handleValidationException(MethodArgumentNotValidException ex) {
        String errorMessage = ex.getBindingResult().getFieldErrors().get(0).getDefaultMessage();
        return ResponseEntity.badRequest().body("Validation error: " + errorMessage);
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateUser(
            @PathVariable Long id,
            @RequestBody UserDTO userDTO,
            @RequestHeader(value = "Authorization") String token) {

        if (validateToken(token, id)) {
            Optional<User> userOptional = userService.findById(id);
            if (userOptional.isPresent()) {
                User user = userOptional.get();
                user.setUserName(userDTO.getUserName());
                user.setLastName(userDTO.getLastName());
                user.setEmail(userDTO.getEmail());
                user.setAge(userDTO.getAge());
                user.setDescription(userDTO.getDescription());
                user.setLocation(userDTO.getLocation());

                userService.save(user);
                return ResponseEntity.ok("Successfully Updated");
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
    }
    @PutMapping("/disable/{id}")
    public ResponseEntity<?> disableUser(@PathVariable Long id, @RequestHeader(value = "Authorization") String token) {
        if (validateToken(token, id)) {
            Optional<User> userOptional = userService.findById(id);
            if (userOptional.isPresent()) {
                User user = userOptional.get();
                user.setActive(false);
                userService.save(user);
                return ResponseEntity.ok("Successfully disabled");
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
    }
    @GetMapping("/findAll")
    public ResponseEntity<?> findAll() {
        List<UserDTO> userListDTO = userService.findAll()
                .stream()
                .map(user -> UserDTO.builder()
                        .userId(user.getUserId())
                        .userName(user.getUserName())
                        .lastName((user.getLastName()))
                        .email(user.getEmail())
                        .age(user.getAge())
                        .description(user.getDescription())
                        .position(user.getPosition())
                        .location(user.getLocation())
                        .isActive(user.isActive())
                        .build()
                ).toList();
        return ResponseEntity.ok(userListDTO);
    }
}
