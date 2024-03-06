package com.example.demo.dto;

import com.example.demo.entities.User;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class EventDTO {
    private Long eventId;
    @NotBlank(message = "'eventName' cannot be empty")
    private String eventName;
    @NotNull(message = "'price' cannot be null")
    @Min(value = 0, message = "'price' must be greater than or equal to 0")
    private Float price;
    @NotNull(message = "'startEvent' cannot be null")
    @Future(message = "The date must be later than the current date")
    private LocalDateTime startEvent;
    @NotNull(message = "'eventHours' cannot be null")
    @Min(value = 1, message = "'eventHours' must be greater than or equal to 1")
    private int eventHours;
    private String eventDescription;
    @NotNull(message = "'playersQuantity' cannot be null")
    @Min(value = 10,message = "'playersQuantity' must be between 10 and 22")
    @Max(value = 22 ,message = "'playersQuantity' must be between 10 and 22")
    private int playersQuantity;
    @NotNull(message = "'remainingPlayers' cannot be null")
    private int remainingPlayers;
    @NotNull(message = "'latitude' cannot be null")
    private String location;
    @NotNull(message = "'latitude' cannot be null")
    private Float latitude;
    @NotNull(message = "'longitude' cannot be null")
    private Float longitude;
    private boolean available;
    @NotNull(message = "User cannot be empty. You need to provide the userId field.")
    private User user;
}
