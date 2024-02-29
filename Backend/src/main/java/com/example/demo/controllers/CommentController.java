package com.example.demo.controllers;

import com.example.demo.dto.CommentDTO;
import com.example.demo.entities.Comment;
import com.example.demo.service.ICommentService;
import com.example.demo.utils.JWTUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
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
    private final JWTUtil jwtUtil;


    public CommentController(ICommentService commentService, JWTUtil jwtUtil) {
        this.commentService = commentService;
        this.jwtUtil = jwtUtil;


    }

    private boolean validateToken(String token, Long userIdComparable) {
        String userId = jwtUtil.getKey(token);
        return userId.equals(userIdComparable.toString());
    }

    @PostMapping("/save")
    public ResponseEntity<?> saveComment(@RequestBody CommentDTO commentDTO, @RequestHeader(value = "Authorization") String token) throws URISyntaxException {
        if (validateToken(token, commentDTO.getUser().getUserId())) {
            Date currentDate = new Date();
            if (commentDTO.getCommentText().isBlank()) {
                return ResponseEntity.badRequest().build();
            }

            Comment comment = Comment.builder().commentDate(currentDate).commentText(commentDTO.getCommentText()).event(commentDTO.getEvent()).user(commentDTO.getUser()).build();

            commentService.save(comment);

            return ResponseEntity.created(new URI("/api/comment/save")).build();
        }
        return ResponseEntity.status(HttpStatusCode.valueOf(401)).body("Invalid token");
    }


    @GetMapping("/findByEvent/{eventId}")
    public ResponseEntity<?> findByEvent(@PathVariable Long eventId) throws URISyntaxException {
        if (eventId == null) {
            return ResponseEntity.badRequest().build();
        }
        List<CommentDTO> commentListDTO = commentService.findAllCommentsByEvent(eventId).stream().map(comment -> CommentDTO.builder().commentId(comment.getCommentId()).commentText(comment.getCommentText()).user(comment.getUser()).event(comment.getEvent()).build()).toList();
        return ResponseEntity.ok(commentListDTO);


    }


    @DeleteMapping("/delete/{commentId}")
    public ResponseEntity<?> delete(@PathVariable Long commentId, @RequestHeader(value = "UserId") Long userId, @RequestHeader(value = "Authorization") String token) throws URISyntaxException {

        if (validateToken(token, userId)) {
            if (commentId != null) {
                commentService.deleteById(commentId);
                return ResponseEntity.ok("Successfully deleted");
            }

            return ResponseEntity.status(HttpStatus.valueOf(404)).body("Comment not found");

        } else {
            return ResponseEntity.status(HttpStatus.valueOf(401)).body("Invalid token");
        }
    }


    @PutMapping("/update")
    public ResponseEntity<?> updateComment(@RequestBody CommentDTO commentDTO, @RequestHeader(value = "Authorization") String token) {
        if (validateToken(token, commentDTO.getUser().getUserId())) {
            Optional<Comment> foundComment = commentService.findById(commentDTO.getCommentId());

            if (foundComment.isPresent()) {

                Comment comment = foundComment.get();
                if (!jwtUtil.getKey(token).equals(comment.getUser().getUserId().toString())) {
                    return ResponseEntity.status(HttpStatus.valueOf(403)).body("Unauthorized operation. User mismatch.");
                }
                comment.setCommentText(commentDTO.getCommentText());
                commentService.save(comment);
                return ResponseEntity.ok("Successfully Updated");

            }
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.status(HttpStatusCode.valueOf(401)).body("Invalid token");

    }

}




