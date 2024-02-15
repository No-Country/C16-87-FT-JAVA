package com.example.demo.dto;

import jakarta.persistence.Column;

import java.util.Date;

public class EventDTO {

    private Long eventId;
    private String eventName;
    private Float price;

    private Date startEvent;

    private int eventHours;

    private String eventDescription;

    private int playersQuantity;
    private boolean available;

}
