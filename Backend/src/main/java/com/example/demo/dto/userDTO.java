package com.example.demo.dto;

import com.example.demo.enums.Position;
import jakarta.persistence.Column;

import java.util.Date;

public class userDTO {
    private int userId;
    private String userName;
    private String lastName;
    private String email;
    private int age;
    private String description;
    private Position position;
    private String location;
    private Date createdOn;
}
