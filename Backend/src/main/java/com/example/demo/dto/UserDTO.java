package com.example.demo.dto;

import com.example.demo.enums.Position;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class UserDTO {
    private Long userId;
    private String userName;
    private String lastName;
    private String email;
    private int age;
    private String description;
    private Position position;
    private String location;
    private Date createdOn;

}
