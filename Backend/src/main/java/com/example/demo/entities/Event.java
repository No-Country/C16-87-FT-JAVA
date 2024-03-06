package com.example.demo.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Table(name = "events")

public final class Event {
    @Id
    @Column(name="event_id")
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long eventId;
    @Column(name ="event_name")
    private String eventName;
    private Float price;
    @Column(name="start_event")
    private LocalDateTime startEvent;
    @Column(name="event_hours")
    private int eventHours;
    @Column(name="event_description")
    private String eventDescription;
    @Column(name= "players_quantity")
    private int playersQuantity;
    @Column(name = "remaining_players")
    private int remainingPlayers;
    private String location;
    private double latitude;
    private double longitude;
    private boolean available;
    @ManyToOne
    @JoinColumn(name="user_id", nullable = false)
    @JsonIgnore
    private User user;

    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Comment> comments = new ArrayList<>();

    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<UserEvent> participants = new ArrayList<>();
}
