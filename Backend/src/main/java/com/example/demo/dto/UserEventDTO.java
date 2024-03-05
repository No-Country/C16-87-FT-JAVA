package com.example.demo.dto;

import com.example.demo.entities.Event;
import com.example.demo.entities.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserEventDTO {
    private Long userEventId;
    private User user;
    private Event event;
}
