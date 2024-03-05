package com.example.demo.service;

import com.example.demo.entities.Comment;

import java.util.List;
import java.util.Optional;

public interface ICommentService {
    List<Comment> findAllCommentsByUser(Long userId);
    List<Comment> findAllCommentsByEvent(Long eventId);
    Optional<Comment> findById(Long commentId);
    void save(Comment comment);
    void deleteById(Long commentId);
}
