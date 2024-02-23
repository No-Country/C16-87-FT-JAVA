package com.example.demo.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Table(name = "comments")
public final class Comment {
    @Id
    @Column(name="comment_id")
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long commentId;
    @Column(name="comment_text")
    private String commentText;
    @Column(name="comment_date")
    private Date commentDate;

    @ManyToOne
    @JoinColumn(name = "event_id", nullable = false)
    @JsonIgnore
    private Event event;


    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private User user;

}
