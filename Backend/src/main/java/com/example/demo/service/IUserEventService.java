package com.example.demo.service;

import com.example.demo.entities.UserEvent;

import java.util.List;
import java.util.Optional;

public interface IUserEventService {
    Optional<UserEvent> findById(Long id);
    void save(UserEvent userEvent);
    void delete(UserEvent userEvent);
    Optional<UserEvent> userEventByEventIdAndUserId(Long eventId, Long userId);
    List<UserEvent> findUserEventByEventId(Long eventId);
    int allUsersInEvent(Long eventId);
    boolean isUserInEvent(Long eventId, Long userId);
}
