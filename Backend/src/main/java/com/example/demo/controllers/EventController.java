package com.example.demo.controllers;

import com.example.demo.dto.EventDTO;
import com.example.demo.entities.Event;
import com.example.demo.service.IEventService;
import com.example.demo.utils.JWTUtil;
import io.jsonwebtoken.SignatureException;
import org.springframework.http.HttpStatusCode;
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
        String userId = jwtUtil.getKey(token);
        return userId.equals(userIdComparable.toString());
    }

    @PostMapping("/save")
    public ResponseEntity<?> createEvent(
            @RequestBody EventDTO eventDTO,
            @RequestHeader(value = "Authorization") String token,
            @RequestHeader(value = "UserId") Long userId) throws URISyntaxException {
        try {
            if (validateToken(token, userId)) {
                if (eventDTO.getEventName().isBlank()) {
                    return ResponseEntity.badRequest().build();
                }
                if (eventDTO.getUser().getUserId() != userId) {
                    return ResponseEntity.status(HttpStatusCode.valueOf(403)).body("Unauthorized operation. User mismatch.");
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
        } catch (SignatureException e) {
            return ResponseEntity.status(HttpStatusCode.valueOf(401)).body("Invalid token. Please, login again.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatusCode.valueOf(500)).body("An unexpected error occurred. Please try again later.");
        }
        return ResponseEntity.badRequest().build();
    }

    @PutMapping("/update/{eventId}")
    public ResponseEntity<?> updateEvent(
            @PathVariable Long eventId,
            @RequestBody EventDTO eventDTO,
            @RequestHeader(value = "Authorization") String token,
            @RequestHeader(value = "UserId") Long userId) {

        try {
            if (validateToken(token, userId)) {
                Optional<Event> eventOptional = eventService.findById(eventId);
                if (eventOptional.isPresent()) {
                    Event event = eventOptional.get();
                    if (event.getUser().getUserId() != userId) {
                        return ResponseEntity.status(HttpStatusCode.valueOf(403)).body("Unauthorized operation. User mismatch.");
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
            }
        } catch (SignatureException e) {
            return ResponseEntity.status(HttpStatusCode.valueOf(401)).body("Invalid token. Please, login again.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatusCode.valueOf(500)).body("An unexpected error occurred. Please try again later.");
        }
        return ResponseEntity.badRequest().build();
    }

    @PutMapping("/disable/{eventId}")
    public ResponseEntity<?> disableEvent(
            @PathVariable Long eventId,
            @RequestHeader(value = "Authorization") String token,
            @RequestHeader(value = "UserId") Long userId) {
        try {
            if (validateToken(token, userId)) {
                Optional<Event> eventOptional = eventService.findById(eventId);
                if (eventOptional.isPresent()) {
                    Event event = eventOptional.get();
                    if (event.getUser().getUserId() != userId) {
                        return ResponseEntity.status(HttpStatusCode.valueOf(403)).body("Unauthorized operation. User mismatch.");
                    }
                    event.setAvailable(false);
                    eventService.save(event);
                    return ResponseEntity.ok("Successfully disabled");
                }
            }
        } catch (SignatureException e) {
            return ResponseEntity.status(HttpStatusCode.valueOf(401)).body("Invalid token. Please, login again.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatusCode.valueOf(500)).body("An unexpected error occurred. Please try again later.");
        }
        return ResponseEntity.badRequest().build();
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

    //Find events by location
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
