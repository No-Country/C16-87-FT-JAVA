package com.example.demo.service.impl;

import com.example.demo.entities.Event;
import com.example.demo.persistance.IEventDAO;
import com.example.demo.service.IEventService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventServiceImpl implements IEventService {

    private final IEventDAO eventDAO;

    public EventServiceImpl(IEventDAO eventDAO) {
        this.eventDAO = eventDAO;
    }

    @Override
    public List<Event> findAll() {
        return eventDAO.findAll();
    }

    @Override
    public Optional<Event> findById(Long eventId) {
        return eventDAO.findById(eventId);
    }

    @Override
    public void save(Event event) {
        eventDAO.save(event);
    }

    @Override
    public void deleteById(Long eventId) {
        eventDAO.deleteById(eventId);
    }

    @Override
    public List<Event> findEventByLocation(double latitude,double longitude,double distance) {
        return eventDAO.findEventByLocation(latitude,longitude,distance);
    }
    @Override
    public List<Event> findEventsByUserId(Long userId) {
        return eventDAO.findEventsByUserId(userId);
    }

}
