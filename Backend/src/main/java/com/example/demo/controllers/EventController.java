package com.example.demo.controllers;

import com.example.demo.dto.EventDTO;
import com.example.demo.dto.UserEventDTO;
import com.example.demo.entities.Event;
import com.example.demo.entities.User;
import com.example.demo.entities.UserEvent;
import com.example.demo.service.IEventService;
import com.example.demo.service.IUserEventService;
import com.example.demo.service.IUserService;
import com.example.demo.utils.JWTUtil;
import io.jsonwebtoken.JwtException;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/event")
public class EventController {
    private final IEventService eventService;
    private final IUserService userService;
    private final IUserEventService userEventService;
    private final JWTUtil jwtUtil;

    public EventController(IEventService eventService, IUserService userService, IUserEventService userEventService, JWTUtil jwtUtil) {
        this.eventService = eventService;
        this.userService = userService;
        this.userEventService = userEventService;
        this.jwtUtil = jwtUtil;
    }

    private boolean validateToken(String token, Long userIdComparable) {
        String userId = jwtUtil.getId(token);
        return userId.equals(userIdComparable.toString());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<String> handleValidationException(MethodArgumentNotValidException ex) {
        String errorMessage = ex.getBindingResult().getFieldErrors().get(0).getDefaultMessage();
        return ResponseEntity.badRequest().body("Validation error: " + errorMessage);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createEvent(
            @Valid
            @RequestBody EventDTO eventDTO,
            @RequestHeader(value = "Authorization") String token) {

        if (eventDTO.getUser().getUserId() == null) {
            return ResponseEntity.badRequest().body("You need to provide the 'userId' in the 'user' field");
        }
        Optional<User> userOptional = userService.findById(eventDTO.getUser().getUserId());
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User associated with the token not found");
        }
        if (validateToken(token, eventDTO.getUser().getUserId())) {
            if (eventDTO.getRemainingPlayers() > eventDTO.getPlayersQuantity() - 1) {
                return ResponseEntity.badRequest().body("Validation error: remainingPlayers must be less than " + (eventDTO.getPlayersQuantity() - 1));
            }
            Event event = Event.builder()
                    .eventName(eventDTO.getEventName())
                    .price(eventDTO.getPrice())
                    .startEvent(eventDTO.getStartEvent())
                    .eventHours(eventDTO.getEventHours())
                    .eventDescription(eventDTO.getEventDescription())
                    .playersQuantity(eventDTO.getPlayersQuantity())
                    .remainingPlayers(eventDTO.getRemainingPlayers())
                    .location(eventDTO.getLocation().toLowerCase())
                    .latitude(eventDTO.getLatitude())
                    .longitude(eventDTO.getLongitude())
                    .available(true)
                    .user(eventDTO.getUser())
                    .build();
            eventService.save(event);
            UserEvent userEvent = UserEvent.builder()
                    .user(event.getUser())
                    .event(event)
                    .build();
            userEventService.save(userEvent);
            return ResponseEntity.ok("Event created successfully");
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
    }

    @PutMapping("/update/{eventId}")
    public ResponseEntity<?> updateEvent(
            @PathVariable Long eventId,
            @Valid
            @RequestBody EventDTO eventDTO,
            @RequestHeader(value = "Authorization") String token) {
        if (eventDTO.getUser().getUserId() == null) {
            return ResponseEntity.badRequest().body("You need to provide the 'userId' in the 'user' field");
        }
        Optional<User> userOptional = userService.findById(eventDTO.getUser().getUserId());
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User associated with the token not found");
        }
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
                event.setRemainingPlayers(eventDTO.getRemainingPlayers());
                event.setLocation(eventDTO.getLocation());
                event.setLatitude(eventDTO.getLatitude());
                event.setLongitude(eventDTO.getLongitude());
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

    @GetMapping("/findById/{eventId}")
    public ResponseEntity<?> findById(
            @PathVariable Long eventId) {
        Optional<Event> eventOptional = eventService.findById(eventId);
        if (eventOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Event not found");
        }
        Event event = eventOptional.get();
        EventDTO eventDTO = EventDTO.builder()
                .eventId(event.getEventId())
                .eventName(event.getEventName())
                .price(event.getPrice())
                .startEvent(event.getStartEvent())
                .eventHours(event.getEventHours())
                .eventDescription(event.getEventDescription())
                .playersQuantity(event.getPlayersQuantity())
                .remainingPlayers(event.getRemainingPlayers())
                .location(event.getLocation())
                .longitude(event.getLongitude())
                .latitude(event.getLatitude())
                .available(event.isAvailable())
                .user(event.getUser())
                .build();

        return ResponseEntity.ok(eventDTO);

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
                        .remainingPlayers(event.getRemainingPlayers())
                        .location(event.getLocation())
                        .longitude(event.getLongitude())
                        .latitude(event.getLatitude())
                        .available(event.isAvailable())
                        .user(event.getUser())
                        .build()
                ).toList();
        return ResponseEntity.ok(eventDTOList);
    }

    @GetMapping("/coordinates/{latitude}/{longitude}/{distance}")
    public ResponseEntity<?> findEventByLocation(@PathVariable double latitude, @PathVariable double longitude, @PathVariable double distance) {
        if (latitude != 0 && longitude != 0 && distance != 0) {
            double distanceMt = distance * 1000;
            List<EventDTO> eventDTOList = eventService.findEventByLocation(latitude, longitude, distanceMt).stream()
                    .map(event -> EventDTO.builder()
                            .eventId(event.getEventId())
                            .eventName(event.getEventName())
                            .price(event.getPrice())
                            .startEvent(event.getStartEvent())
                            .eventHours(event.getEventHours())
                            .eventDescription(event.getEventDescription())
                            .playersQuantity(event.getPlayersQuantity())
                            .remainingPlayers(event.getRemainingPlayers())
                            .location(event.getLocation())
                            .longitude(event.getLongitude())
                            .latitude(event.getLatitude())
                            .available(event.isAvailable())
                            .user(event.getUser())
                            .build()
                    ).toList();

            return ResponseEntity.ok(eventDTOList);
        }
        return ResponseEntity.badRequest().body("Invalid parameters");

    }

    @PostMapping("/{eventId}/join/{userId}")
    public ResponseEntity<?> addPlayer(
            @PathVariable Long eventId,
            @PathVariable Long userId,
            @RequestHeader(value = "Authorization") String token) {
        if (validateToken(token, userId)) {
            Optional<Event> eventOptional = eventService.findById(eventId);
            Optional<User> userOptional = userService.findById(userId);
            if (eventOptional.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Event not found");
            }
            if (userOptional.isPresent()) {
                Event event = eventOptional.get();
                User user = userOptional.get();
                if (userEventService.isUserInEvent(eventId, userId)) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User already joined.");
                }
                if (event.getRemainingPlayers() == 0) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Event is full");
                }
                UserEvent userEvent = UserEvent.builder()
                        .user(user)
                        .event(event)
                        .build();
                userEventService.save(userEvent);

                event.setRemainingPlayers(event.getRemainingPlayers() - 1);
                eventService.save(event);
                return ResponseEntity.ok("Player added to event successfully");
            }
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
    }

    @DeleteMapping("/{eventId}/withdraw/{userId}")
    public ResponseEntity<?> withdrawParticipation(
            @PathVariable Long eventId,
            @PathVariable Long userId,
            @RequestHeader(value = "Authorization") String token) {
        if (validateToken(token, userId)) {
            Optional<Event> eventOptional = eventService.findById(eventId);
            Optional<User> userOptional = userService.findById(userId);
            if (eventOptional.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Event not found");
            }
            if (userOptional.isPresent()) {
                Optional<UserEvent> userEventOptional = userEventService.userEventByEventIdAndUserId(eventId, userId);
                if (userEventOptional.isEmpty()) {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User in event not found");
                }
                UserEvent userEvent = userEventOptional.get();
                userEventService.delete(userEvent);

                Event event = eventOptional.get();
                event.setRemainingPlayers(event.getRemainingPlayers() + 1);
                eventService.save(event);
                return ResponseEntity.ok("Participation successfully withdrawn");
            }
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
    }

    @GetMapping("{eventId}/players")
    public ResponseEntity<?> playersByEventId(@PathVariable Long eventId) {
        Optional<Event> eventOptional = eventService.findById(eventId);
        if (eventOptional.isPresent()) {
            List<UserEventDTO> userEventDTOList = userEventService.findUserEventByEventId(eventId)
                    .stream()
                    .map(userEvent -> UserEventDTO.builder()
                            .userEventId(userEvent.getUserEventId())
                            .user(userEvent.getUser())
                            .event(userEvent.getEvent())
                            .build()
                    ).toList();
            return ResponseEntity.ok(userEventDTOList);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Event not found");
    }

    @GetMapping("/findByUserId/{userId}")
    public ResponseEntity<?> eventsByUserId(@PathVariable Long userId) {
        Optional<User> userOptional = userService.findById(userId);
        if (userOptional.isPresent()) {
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
                            .remainingPlayers(event.getRemainingPlayers())
                            .location(event.getLocation())
                            .longitude(event.getLongitude())
                            .latitude(event.getLatitude())
                            .available(event.isAvailable())
                            .user(event.getUser())
                            .build()
                    ).toList();
            return ResponseEntity.ok(eventDTOList);
        }
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Unauthorized operation. User mismatch.");
    }
}
