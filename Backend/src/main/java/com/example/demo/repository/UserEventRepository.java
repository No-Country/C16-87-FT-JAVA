package com.example.demo.repository;

import com.example.demo.entities.UserEvent;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface UserEventRepository  extends CrudRepository<UserEvent,Long> {

    @Query("SELECT u FROM UserEvent u  WHERE u.event.eventId = :eventId AND u.user.userId = :userId")
    Optional<UserEvent> userEventByEventIdAndUserId(Long eventId, Long userId);
    @Query("SELECT u FROM UserEvent u  WHERE u.event.eventId = :eventId")
    List<UserEvent> findUserEventByEventId(Long eventId);

    @Query("SELECT COUNT(u) FROM UserEvent u WHERE u.event.eventId = :eventId")
    int allUsersInEvent(Long eventId);

    @Query("SELECT COUNT(u) > 0 FROM UserEvent u WHERE u.event.eventId = :eventId AND u.user.userId = :userId")
    boolean isUserInEvent(Long eventId, Long userId);

}
