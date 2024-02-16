package com.example.demo.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Table(name = "event")

public class Event {
    @Id
    @Column(name="event_id")
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
    private User user;
    @OneToMany
    private List<Comment> comments;
}