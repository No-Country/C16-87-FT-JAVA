package com.example.demo.service.impl;


import com.example.demo.entities.UserEvent;
import com.example.demo.persistance.IUserEventDAO;
import com.example.demo.service.IUserEventService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserEventServiceImpl implements IUserEventService {
    private final IUserEventDAO iUserEventDAO;

    public UserEventServiceImpl(IUserEventDAO iUserEventDAO) {
        this.iUserEventDAO = iUserEventDAO;
    }

    @Override
    public Optional<UserEvent> findById(Long id) {
        return iUserEventDAO.findById(id);
    }

    @Override
    public void save(UserEvent userEvent) {
        iUserEventDAO.save(userEvent);
    }

    @Override
    public void delete(UserEvent userEvent) {
        iUserEventDAO.delete(userEvent);
    }

    @Override
    public Optional<UserEvent> userEventByEventIdAndUserId(Long eventId, Long userId) {
        return iUserEventDAO.userEventByEventIdAndUserId(eventId,userId);
    }

    @Override
    public List<UserEvent> findUserEventByEventId(Long eventId) {
        return iUserEventDAO.findUserEventByEventId(eventId);
    }

    @Override
    public int allUsersInEvent(Long eventId) {
        return iUserEventDAO.allUsersInEvent(eventId);
    }

    @Override
    public boolean isUserInEvent(Long eventId, Long userId) {
        return iUserEventDAO.isUserInEvent(eventId,userId);
    }
}
