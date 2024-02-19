package com.example.demo.entities;

import com.example.demo.enums.Position;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
@Table(name = "users") //"user" es una palabra reservada en posgres SQL
public final class User {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;
    @Column(name = "user_name")
    private String userName;
    @Column(name = "last_name")
    private String lastName;
    @Column(name = "email")
    private String email;
    private int age;
    private String description;
    @Enumerated(EnumType.STRING)
    private Position position;
    private String location;
    private Date createdOn;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL , fetch = FetchType.LAZY)
    private List<Event> events = new ArrayList<>();


}
