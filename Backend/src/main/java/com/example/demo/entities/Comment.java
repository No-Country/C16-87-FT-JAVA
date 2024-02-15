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
@Table(name = "comment")
public class Comment {
    @Id
    @Column(name="comment_id")
    private Long commentId;
    @Column(name="comment_text")
    private String commentText;
    @Column(name="comment_date")
    private Date commentDate;

    @ManyToOne()
    //muchos comentarios pueden esta asociados a un solo event
    private Event event;

}
