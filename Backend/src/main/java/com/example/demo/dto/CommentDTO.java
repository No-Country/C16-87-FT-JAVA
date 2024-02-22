package com.example.demo.dto;

import com.example.demo.entities.Event;
import com.example.demo.entities.User;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;


@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class CommentDTO {
    private Long commentId;
    private String commentText;
    private User user;
    private Event event;
}
