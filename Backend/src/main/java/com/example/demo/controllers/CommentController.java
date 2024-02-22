package com.example.demo.controllers;

import com.example.demo.dto.CommentDTO;
import com.example.demo.entities.Comment;
import com.example.demo.service.ICommentService;
import com.example.demo.service.IUserService;
import jakarta.websocket.server.PathParam;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Date;

@RestController
@RequestMapping("/api/comment")
public class CommentController{
    private final ICommentService commentService;

    public CommentController(ICommentService commentService) {
        this.commentService = commentService;

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

    /*

        @Override
    public List<Comment> findAllCommentsByUser(Long userId) {
        return (List<Comment>) iCommentDAO.findAllCommentsByUser(userId);
    }
     */

    @GetMapping("/commentsByUser/{userId}")
    public ResponseEntity<?> commentsByUser(@PathVariable Long userId) throws URISyntaxException {
        // List<Comment> allCommentUser;
        if (userId == null) {
            return ResponseEntity.badRequest().build();

        }
        //busca los comentarios asociados a ese usuario
        List<CommentDTO> commentListDTO = commentService.findAllCommentsByUser(userId).stream()
                .map(comment -> CommentDTO.builder()
                        .commentText(comment.getCommentText())
                        .user(comment.getUser())
                        .event(comment.getEvent())
                        .build()
                        .toList());
        return ResponseEntity.ok(commentListDTO);
    }






    }




