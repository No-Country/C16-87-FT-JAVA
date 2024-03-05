package com.example.demo.dto;

import com.example.demo.entities.Event;
import com.example.demo.entities.User;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class CommentDTO {
    private Long commentId;
    @NotBlank(message = "'commentText' cannot be empty")
    private String commentText;
    @NotNull(message = "user cannot be empty. You need to provide the userId field.")
    private User user;
    @NotNull(message = "event cannot be empty. You need to provide the eventId field.")
    private Event event;
}
