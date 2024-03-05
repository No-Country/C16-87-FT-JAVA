package com.example.demo.controllers;

import com.example.demo.dto.CommentDTO;
import com.example.demo.entities.Comment;
import com.example.demo.entities.Event;
import com.example.demo.entities.User;
import com.example.demo.service.ICommentService;
import com.example.demo.service.IEventService;
import com.example.demo.service.IUserService;
import com.example.demo.utils.JWTUtil;
import io.jsonwebtoken.JwtException;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/comment")
public class CommentController {
    private final ICommentService commentService;
    private final IUserService userService;
    private final IEventService eventService;
    private final JWTUtil jwtUtil;
    public CommentController(ICommentService commentService, IUserService userService,IEventService eventService, JWTUtil jwtUtil) {
        this.commentService = commentService;
        this.userService = userService;
        this.eventService = eventService;
        this.jwtUtil = jwtUtil;
    }
    private boolean validateToken(String token, Long userIdComparable) {
        String userId = jwtUtil.getId(token);
        return userId.equals(userIdComparable.toString());
    }
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<String> handleValidationException(MethodArgumentNotValidException ex) {
        String errorMessage = ex.getBindingResult().getFieldErrors().get(0).getDefaultMessage();
        return ResponseEntity.badRequest().body("Validation error: " + errorMessage);
    }
    @PostMapping("/create")
    public ResponseEntity<?> createComment(
            @Valid
            @RequestBody CommentDTO commentDTO,
            @RequestHeader(value = "Authorization") String token) {
        if (commentDTO.getUser().getUserId() == null) {
            return ResponseEntity.badRequest().body("You need to provide the 'userId' in the 'user' field");
        }
        if (commentDTO.getEvent().getEventId() == null) {
            return ResponseEntity.badRequest().body("You need to provide the 'eventId' in the 'event' field");
        }
        Optional<User> userOptional = userService.findById(commentDTO.getUser().getUserId());
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User associated with the token not found");
        }
        if (validateToken(token, commentDTO.getUser().getUserId())) {
            LocalDateTime currentDate = LocalDateTime.now();
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
            return ResponseEntity.ok("Comment created successfully");
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
    }
    @PutMapping("/update/{commentId}")
    public ResponseEntity<?> updateComment(
            @PathVariable Long commentId,
            @Valid
            @RequestBody CommentDTO commentDTO,
            @RequestHeader(value = "Authorization") String token) {
        if (commentDTO.getUser().getUserId() == null) {
            return ResponseEntity.badRequest().body("You need to provide the 'userId' in the 'user' field");
        }
        if (commentDTO.getEvent().getEventId() == null) {
            return ResponseEntity.badRequest().body("You need to provide the 'eventId' in the 'event' field");
        }
        Optional<User> userOptional = userService.findById(commentDTO.getUser().getUserId());
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User associated with the token not found");
        }
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
    @GetMapping("/findByEvent/{eventId}")
    public ResponseEntity<?> findByEvent(@PathVariable Long eventId){
        Optional<Event> eventOptional = eventService.findById(eventId);
        if (eventOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Event not found");
        }
        List<CommentDTO> commentListDTO = commentService.findAllCommentsByEvent(
                eventId).stream().map(
                        comment -> CommentDTO.builder()
                                .commentId(comment.getCommentId())
                                .commentText(comment.getCommentText())
                                .user(comment.getUser())
                                .event(comment.getEvent())
                                .build()).toList();
        return ResponseEntity.ok(commentListDTO);
    }
}




