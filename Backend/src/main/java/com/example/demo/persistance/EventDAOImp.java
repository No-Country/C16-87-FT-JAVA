package com.example.demo.persistance;

import com.example.demo.entities.Event;
import com.example.demo.repository.EventRepository;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class EventDAOImp implements IEventDAO {
    private final EventRepository eventRepository;
    public EventDAOImp(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    @Override
    public List<Event> findAll() {
        return (List<Event>) eventRepository.findAll();
    }
    @Override
    public Optional<Event> findById(Long eventId) {
        return eventRepository.findById(eventId);
    }
    @Override
    public void save(Event event) {
        eventRepository.save(event);
    }
    @Override
    public void deleteById(Long eventId) {
        eventRepository.deleteById(eventId);
    }
    @Override
    public List<Event> findEventByLocation(double latitude,double longitude,double distance) {
        return eventRepository.findEventByLocation( latitude, longitude, distance);
    }

    @Override
    public List<Event> findEventsByUserId(Long userId) {
        return eventRepository.findEventsByUserId(userId);
    }
}
