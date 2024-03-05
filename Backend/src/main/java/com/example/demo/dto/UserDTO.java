package com.example.demo.dto;

import com.example.demo.enums.Position;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDTO {
    private Long userId;
    private String userName;
    private String lastName;
    @NotBlank(message = "'email' cannot be null or empty")
    @Email(message = "please provide a valid email address")
    private String email;
    @NotNull(message = "'password' cannot be null")
    @Size(min = 8,message = "password must be at least 8 characters long")
    private String password;
    private int age;
    private String description;
    private Position position;
    private String location;
    private boolean isActive;
}
