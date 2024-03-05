package com.example.demo.persistance;

import com.example.demo.entities.UserEvent;
import com.example.demo.repository.UserEventRepository;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
@Component
public class UserEventDAOImp implements IUserEventDAO{

    private final UserEventRepository userEventRepository;

    public UserEventDAOImp(UserEventRepository userEventRepository) {
        this.userEventRepository = userEventRepository;
    }

    @Override
    public Optional<UserEvent> findById(Long id) {
        return userEventRepository.findById(id);
    }

    @Override
    public void save(UserEvent userEvent) {
       userEventRepository.save(userEvent);
    }

    @Override
    public void delete(UserEvent userEvent) {
        userEventRepository.delete(userEvent);
    }

    @Override
    public Optional<UserEvent>  userEventByEventIdAndUserId(Long eventId, Long userId) {
        return userEventRepository.userEventByEventIdAndUserId(eventId,userId);
    }

    @Override
    public List<UserEvent> findUserEventByEventId(Long eventId) {
        return userEventRepository.findUserEventByEventId(eventId);
    }

    @Override
    public int allUsersInEvent(Long eventId) {
        return userEventRepository.allUsersInEvent(eventId);
    }
    @Override
    public boolean isUserInEvent(Long eventId, Long userId) {
        return userEventRepository.isUserInEvent(eventId,userId);
    }
}
