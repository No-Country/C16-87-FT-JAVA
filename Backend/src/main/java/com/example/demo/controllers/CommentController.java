package com.example.demo.controllers;

import com.example.demo.dto.CommentDTO;
import com.example.demo.entities.Comment;
import com.example.demo.entities.Event;
import com.example.demo.service.ICommentService;
import com.example.demo.service.IEventService;
import com.example.demo.utils.JWTUtil;
import io.jsonwebtoken.JwtException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/comment")
public class CommentController {
    private final ICommentService commentService;
    private final IEventService eventService;
    private final JWTUtil jwtUtil;
    public CommentController(ICommentService commentService, JWTUtil jwtUtil,IEventService eventService) {
        this.commentService = commentService;
        this.eventService = eventService;
        this.jwtUtil = jwtUtil;
    }
    private boolean validateToken(String token, Long userIdComparable) {
        String userId = jwtUtil.getId(token);
        return userId.equals(userIdComparable.toString());
    }

    @PostMapping("/save")
    public ResponseEntity<?> saveComment(
            @RequestBody CommentDTO commentDTO,
            @RequestHeader(value = "Authorization") String token) throws URISyntaxException {
        if (validateToken(token, commentDTO.getUser().getUserId())) {
            Date currentDate = new Date();
            Optional<Event> eventOptional = eventService.findById(commentDTO.getEvent().getEventId());
            if(eventOptional.isEmpty()){
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Event not found");
            }
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
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
    }
    @GetMapping("/findByEvent/{eventId}")
    public ResponseEntity<?> findByEvent(@PathVariable Long eventId){
        if (eventId == null) {
            return ResponseEntity.badRequest().build();
        }
        List<CommentDTO> commentListDTO = commentService.findAllCommentsByEvent(eventId).stream().map(comment -> CommentDTO.builder().commentId(comment.getCommentId()).commentText(comment.getCommentText()).user(comment.getUser()).event(comment.getEvent()).build()).toList();
        return ResponseEntity.ok(commentListDTO);
    }
    @DeleteMapping("/delete/{commentId}")
    public ResponseEntity<?> delete(
            @PathVariable Long commentId,
            @RequestHeader(value = "Authorization") String token){
        Optional<Comment> commentOptional = commentService.findById(commentId);
        if (commentOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Comment not found");
        }
        Comment comment = commentOptional.get();
        try {
            if (!validateToken(token, comment.getUser().getUserId())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Unauthorized operation. User mismatch.");
            }
            commentService.deleteById(commentId);
            return ResponseEntity.ok("Successfully deleted");
        } catch (JwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
        }

    }
    @PutMapping("/update/{commentId}")
    public ResponseEntity<?> updateComment(
            @PathVariable Long commentId,
            @RequestBody CommentDTO commentDTO,
            @RequestHeader(value = "Authorization") String token) {
        if (validateToken(token, commentDTO.getUser().getUserId())) {
            Optional<Comment> commentOptional = commentService.findById(commentId);
            if (commentOptional.isPresent()) {
                Comment comment = commentOptional.get();
                if (!comment.getUser().getUserId().equals(commentDTO.getUser().getUserId())) {
                    return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Unauthorized operation. User mismatch.");
                }
                comment.setCommentText(commentDTO.getCommentText());
                commentService.save(comment);
                return ResponseEntity.ok("Successfully Updated");
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Comment not found");
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
    }

}




