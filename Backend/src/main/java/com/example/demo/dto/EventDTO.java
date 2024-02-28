package com.example.demo.dto;

import com.example.demo.entities.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class EventDTO {

    private Long eventId;
    private String eventName;
    private Float price;
    private Date startEvent;
    private int eventHours;
    private String eventDescription;
    private int playersQuantity;
    private String location;
    private boolean available;
    private double latitud;
    private double longitud;
    private User user;
}
