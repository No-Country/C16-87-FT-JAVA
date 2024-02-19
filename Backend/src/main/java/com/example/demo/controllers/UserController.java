package com.example.demo.controllers;

import com.example.demo.dto.UserDTO;
import com.example.demo.entities.User;
import com.example.demo.service.IUserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

@RestController
@RequestMapping("/api/user")
public class UserController {
    private final IUserService userService;

    public UserController(IUserService userService) {
        this.userService = userService;
    }

    @PostMapping("/save")
    public ResponseEntity<?> saveUser(@RequestBody UserDTO userDTO) throws URISyntaxException {

        if (userDTO.getUserName().isBlank()) {
            return ResponseEntity.badRequest().build();
        }
        userService.save(User.builder().userName(userDTO.getUserName()).build());
        return ResponseEntity.created(new URI("/api/user/save")).build();
    }

}
