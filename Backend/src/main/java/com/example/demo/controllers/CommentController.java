package com.example.demo.controllers;

import com.example.demo.dto.CommentDTO;
import com.example.demo.dto.UserDTO;
import com.example.demo.entities.Comment;
import com.example.demo.entities.User;
import com.example.demo.service.ICommentService;
import com.example.demo.service.IUserService;
import jakarta.websocket.server.PathParam;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/comment")
public class CommentController{
    private final ICommentService commentService;

    public CommentController(ICommentService commentService) {
        this.commentService = commentService;

    }

    @PostMapping("/save")
        public ResponseEntity<?> saveComment(@RequestBody CommentDTO commentDTO) throws URISyntaxException {
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

    @GetMapping("/findByUser/{userId}")
    public ResponseEntity<?> findByUser(@PathVariable Long userId) throws URISyntaxException {

        if (userId == null) {
            return ResponseEntity.badRequest().build();
        }
        List<CommentDTO> commentListDTO = commentService.findAllCommentsByUser(userId).stream()
                .map(comment -> CommentDTO.builder()
                        .commentId(comment.getCommentId())
                        .commentText(comment.getCommentText())
                        .user(comment.getUser())
                        .event(comment.getEvent())
                        .build()).toList();

        return ResponseEntity.ok(commentListDTO);
    }
    //List<Comment> findAllCommentsByEvent(Long eventId);
    @GetMapping("/findByEvent/{eventId}")
    public ResponseEntity<?> findByEvent(@PathVariable Long eventId) throws URISyntaxException {
        if (eventId == null) {
            return ResponseEntity.badRequest().build();
        }
        List<CommentDTO> commentListDTO = commentService.findAllCommentsByEvent(eventId).stream()
                .map(comment -> CommentDTO.builder()
                        .commentId(comment.getCommentId())
                        .commentText(comment.getCommentText())
                        .user(comment.getUser())
                        .event(comment.getEvent())
                        .build()).toList();
        return ResponseEntity.ok(commentListDTO);



    }


    @DeleteMapping("/delete/{commentId}")
    public ResponseEntity<?> delete(@PathVariable Long commentId) throws URISyntaxException{

        if(commentId!= null){
            commentService.deleteById(commentId);
            return ResponseEntity.noContent().build();
        }


        return ResponseEntity.ok("Successfully Delete");
    }

   // public Optional<Comment> findById(Long commentId) { return ( iCommentDAO.findById(commentId));}
   @GetMapping("/{commentId}")
   public ResponseEntity<?> commentById(@PathVariable Long commentId) throws URISyntaxException {

       if (commentId == null) {
           return ResponseEntity.badRequest().build();
       }

       Optional<Comment> foundComment = commentService.findById(commentId);

       if(foundComment.isPresent()){
           //obtengo el commentario
           Comment comment = foundComment.get();
           CommentDTO commentDTO=CommentDTO.builder()
                   .commentId(comment.getCommentId())
                   .commentText(comment.getCommentText())
                   .user(comment.getUser())
                   .event(comment.getEvent())
                   .build();
           return ResponseEntity.ok(commentDTO);

       }
       return ResponseEntity.badRequest().build();

   }
    @PutMapping("/update/{commentId}")
    public ResponseEntity<?> updateUser(@PathVariable Long commentId, @RequestBody CommentDTO commentDTO){
        Optional<Comment> foundComment = commentService.findById(commentId);

        if(foundComment.isPresent()){
            Comment comment = foundComment.get();
            comment.setCommentText(commentDTO.getCommentText());
            commentService.save(comment);
            return ResponseEntity.ok("Successfully Updated");
        }
        return ResponseEntity.notFound().build();
    }

}




