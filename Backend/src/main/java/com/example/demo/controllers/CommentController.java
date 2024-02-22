package com.example.demo.controllers;

import com.example.demo.dto.CommentDTO;
import com.example.demo.entities.Comment;
import com.example.demo.service.ICommentService;
import com.example.demo.service.IUserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Date;

@RestController
@RequestMapping("/api/comment")
public class CommentController{
    private final ICommentService commentService;
    private final IUserService userService;
    public CommentController(ICommentService commentService, IUserService userService) {
        this.commentService = commentService;
        this.userService = userService;
    }

    @PostMapping("/save")
        public ResponseEntity<?> saveCommnent(@RequestBody CommentDTO commentDTO) throws URISyntaxException {
        Date currentDate = new Date();
        if (commentDTO.getCommentText().isBlank()) {
            return ResponseEntity.badRequest().build();
        }

        Comment comment = Comment.builder()
                .commentDate(currentDate)
                .commentText(commentDTO.getCommentText())
                .event(commentDTO.getEvent())
                .user(commentDTO.getUser())
                .build();

        commentService.save(comment);

        return ResponseEntity.created(new URI("/api/comment/save")).build();
    }
}
