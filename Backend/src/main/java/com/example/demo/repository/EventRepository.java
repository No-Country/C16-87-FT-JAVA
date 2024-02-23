package com.example.demo.repository;

import com.example.demo.entities.Event;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface EventRepository extends CrudRepository<Event,Long> {
    @Query("SELECT e FROM Event e WHERE e.location = ?1")
    List<Event> findEventsByLocation(String location);
}
