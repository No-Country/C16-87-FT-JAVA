package com.example.demo.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.Date;
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
    private Date startEvent;
    @Column(name="event_hours")
    private int eventHours;
    @Column(name="event_description")
    private String eventDescription;
    @Column(name= "players_quantity")
    private int playersQuantity;
    private boolean available;

    @ManyToOne
    @JoinColumn(name="user_id", nullable = false)
    private User user;

    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Comment> comments = new ArrayList<>();
}
