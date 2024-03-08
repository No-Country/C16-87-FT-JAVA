package com.example.demo.persistance;

import com.example.demo.entities.Event;
import com.example.demo.entities.User;

import java.util.List;
import java.util.Optional;

public interface IEventDAO {
    List<Event> findAll();
    Optional<Event> findById(Long eventId);
    void save(Event event);
    void deleteById(Long eventId);
    List<Event> findEventByLocation(double latitude,double longitude,double distance);

    List<Event> findEventsByUserId(Long userId);
}
