package com.example.demo.repository;

import com.example.demo.entities.Event;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EventRepository extends CrudRepository<Event,Long> {

    @Query("SELECT e FROM Event e WHERE " +
            "FUNCTION('earth_distance', FUNCTION('ll_to_earth', :latitude, :longitude), " +
            "FUNCTION('ll_to_earth', e.latitude, e.longitude)) <= :distance " +
              "AND e.startEvent>=CURRENT_DATE ORDER BY e.startEvent ASC")
    List<Event> findEventByLocation(@Param("latitude") double latitude, @Param("longitude") double longitude, @Param("distance") double distance);
}

