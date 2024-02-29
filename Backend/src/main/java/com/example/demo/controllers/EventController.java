package com.example.demo.controllers;

import com.example.demo.dto.EventDTO;
import com.example.demo.entities.Event;
import com.example.demo.service.IEventService;
import com.example.demo.utils.JWTUtil;
import io.jsonwebtoken.JwtException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/event")
public class EventController {

    private final IEventService eventService;
    private final JWTUtil jwtUtil;

    public EventController(IEventService eventService, JWTUtil jwtUtil) {
        this.eventService = eventService;
        this.jwtUtil = jwtUtil;
    }

    private boolean validateToken(String token, Long userIdComparable) {
        String userId = jwtUtil.getId(token);
        return userId.equals(userIdComparable.toString());
    }

    @PostMapping("/save")
    public ResponseEntity<?> createEvent(
            @RequestBody EventDTO eventDTO,
            @RequestHeader(value = "Authorization") String token) throws URISyntaxException {
        if (validateToken(token, eventDTO.getUser().getUserId())) {
            if (eventDTO.getEventName().isBlank()) {
                return ResponseEntity.badRequest().build();
            }
            Event event = Event.builder()
                    .eventName(eventDTO.getEventName())
                    .price(eventDTO.getPrice())
                    .startEvent(eventDTO.getStartEvent())
                    .eventHours(eventDTO.getEventHours())
                    .eventDescription(eventDTO.getEventDescription())
                    .playersQuantity(eventDTO.getPlayersQuantity())
                    .location(eventDTO.getLocation().toLowerCase())
                    .available(true)
                    .user(eventDTO.getUser())
                    .build();
            eventService.save(event);
            return ResponseEntity.created(new URI("/api/events/create")).build();
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
    }

    @PutMapping("/update/{eventId}")
    public ResponseEntity<?> updateEvent(
            @PathVariable Long eventId,
            @RequestBody EventDTO eventDTO,
            @RequestHeader(value = "Authorization") String token) {

        if (validateToken(token, eventDTO.getUser().getUserId())) {
            Optional<Event> eventOptional = eventService.findById(eventId);
            if (eventOptional.isPresent()) {
                Event event = eventOptional.get();
                if (!event.getUser().getUserId().equals(eventDTO.getUser().getUserId())) {
                    return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Unauthorized operation. User mismatch.");
                }
                event.setEventName(eventDTO.getEventName());
                event.setPrice(eventDTO.getPrice());
                event.setStartEvent(eventDTO.getStartEvent());
                event.setEventDescription(eventDTO.getEventDescription());
                event.setPlayersQuantity(eventDTO.getPlayersQuantity());
                event.setLocation(eventDTO.getLocation());
                eventService.save(event);
                return ResponseEntity.ok("Successfully updated");
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Event not found");
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
    }

    @PutMapping("/disable/{eventId}")
    public ResponseEntity<?> disableEvent(
            @PathVariable Long eventId,
            @RequestHeader(value = "Authorization") String token) {
        Optional<Event> eventOptional = eventService.findById(eventId);
        if (eventOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Event not found");
        }
        Event event = eventOptional.get();
        try {
            if (!validateToken(token, event.getUser().getUserId())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Unauthorized operation. User mismatch.");
            }
            if (!event.isAvailable()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Event already disabled");
            }
            event.setAvailable(false);
            eventService.save(event);
            return ResponseEntity.ok("Successfully disabled");
        } catch (JwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
        }
    }

    @GetMapping("/findAll")
    public ResponseEntity<?> findAll() {
        List<EventDTO> eventDTOList = eventService.findAll()
                .stream()
                .map(event -> EventDTO.builder()
                        .eventId(event.getEventId())
                        .eventName(event.getEventName())
                        .price(event.getPrice())
                        .startEvent(event.getStartEvent())
                        .eventHours(event.getEventHours())
                        .eventDescription(event.getEventDescription())
                        .playersQuantity(event.getPlayersQuantity())
                        .location(event.getLocation())
                        .available(event.isAvailable())
                        .user(event.getUser())
                        .build()
                ).toList();
        return ResponseEntity.ok(eventDTOList);
    }
    @GetMapping("/location/{location}")
    public ResponseEntity<?> findEventByLocation(@PathVariable String location) {
        if (location == null) {
            return ResponseEntity.badRequest().build();
        }
        List<EventDTO> eventDTOList = eventService.findEventsByLocation(location.toLowerCase()).stream()
                .map(event -> EventDTO.builder()
                        .eventId(event.getEventId())
                        .eventName(event.getEventName())
                        .price(event.getPrice())
                        .startEvent(event.getStartEvent())
                        .eventHours(event.getEventHours())
                        .eventDescription(event.getEventDescription())
                        .playersQuantity(event.getPlayersQuantity())
                        .location(event.getLocation())
                        .available(event.isAvailable())
                        .user(event.getUser())
                        .build()
                ).toList();
        return ResponseEntity.ok(eventDTOList);
    }
}
