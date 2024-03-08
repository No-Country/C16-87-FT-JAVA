package com.example.demo.service;

import com.example.demo.entities.Event;

import java.util.List;
import java.util.Optional;

public interface IEventService {
    List<Event> findAll();
    Optional<Event> findById(Long eventId);
    void save(Event event);
    void deleteById(Long eventId);
    List<Event> findEventByLocation(double latitude,double longitud,double distance);
    List<Event> findEventsByUserId(Long userId);
}
