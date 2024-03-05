package com.example.demo.repository;

import com.example.demo.entities.Comment;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface CommentRepository extends CrudRepository<Comment,Long> {
    @Query("SELECT c FROM Comment c JOIN c.event e WHERE e.eventId = ?1")
    List<Comment> findAllCommentsByEvent(Long eventId);
    @Query("SELECT c FROM Comment c JOIN c.user u WHERE u.userId = ?1")
    List<Comment> findAllCommentsByUser(Long userId);
}
