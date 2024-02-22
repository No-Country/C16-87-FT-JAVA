package com.example.demo.persistance;

import com.example.demo.entities.Comment;
import com.example.demo.entities.User;
import java.util.List;
import java.util.Optional;


public interface ICommentDAO {

    List<Comment> findAllCommentsByUser(Long userId);
    List<Comment> findAllCommentsByEvent(Long eventId);
    Optional<Comment> findById(Long commentId);
    //update?
    void save(Comment comment);
    //delete
    void deleteById(Long commentId);


}
