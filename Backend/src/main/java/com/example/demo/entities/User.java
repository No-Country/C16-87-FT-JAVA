package com.example.demo.entities;

import com.example.demo.enums.Position;
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
@Table(name = "user")

public class User {
    @Id
    @Column(name = "user_id")
    private int userId;
    private String userName;
    @Column(name = "last_name")
    private String lastName;
    private String email;
    private int age;
    private String description;
    private Position position;
    private String location;
    private Date createdOn;

    @OneToMany(mappedBy = "event")
    private List<Event> event;


}
