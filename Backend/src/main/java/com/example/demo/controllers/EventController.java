package com.example.demo.controllers;

import com.example.demo.dto.EventDTO;
import com.example.demo.entities.Event;
import com.example.demo.service.IEventService;
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

    public EventController(IEventService eventService){
        this.eventService = eventService;
    }
    @PostMapping("/save")
    public ResponseEntity<?> createEvent(@RequestBody EventDTO eventDTO) throws URISyntaxException {

        if(eventDTO.getEventName().isBlank()){
            return ResponseEntity.badRequest().build();
        }
            Event event = Event.builder()
                    .eventName(eventDTO.getEventName())
                    .price(eventDTO.getPrice())
                    .startEvent(eventDTO.getStartEvent())
                    .eventHours(eventDTO.getEventHours())
                    .eventDescription(eventDTO.getEventDescription())
                    .playersQuantity(eventDTO.getPlayersQuantity())
                    .location(eventDTO.getLocation())
                    .available(true)
                    .user(eventDTO.getUser())
                    .build();
            eventService.save(event);
            return ResponseEntity.created(new URI("/api/events/create")).build();
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateEvent(@PathVariable Long id, @RequestBody EventDTO eventDTO){
        Optional<Event> eventOptional = eventService.findById(id);
        if(eventOptional.isPresent()){
            Event event = eventOptional.get();
            event.setEventName(eventDTO.getEventName());
            event.setPrice(eventDTO.getPrice());
            event.setStartEvent(eventDTO.getStartEvent());
            event.setEventDescription(eventDTO.getEventDescription());
            event.setPlayersQuantity(eventDTO.getPlayersQuantity());
            event.setLocation(eventDTO.getLocation());
            eventService.save(event);

            return ResponseEntity.ok("Successfully updated");
        }
        return ResponseEntity.notFound().build();
    }
    @PutMapping("/disable/{id}")
    public ResponseEntity<?> disableEvent(@PathVariable Long id){
        Optional<Event> eventOptional = eventService.findById(id);
        if(eventOptional.isPresent()){
            Event event = eventOptional.get();
            event.setAvailable(false);
            eventService.save(event);

            return ResponseEntity.ok("Successfully disabled");
        }
        return ResponseEntity.notFound().build();
    }
    @GetMapping("/findAll")
    public ResponseEntity<?> findAll(){
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
}
