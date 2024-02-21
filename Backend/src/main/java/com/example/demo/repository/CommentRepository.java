package com.example.demo.repository;

import com.example.demo.entities.Comment;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface CommentRepository extends CrudRepository<Comment,Long> {
    //consultas externas que no pertecenen a la entidad

    @Query("SELECT c FROM Comment c WHERE c.event_id = ?1")
    List<Comment> findAllCommentsByEvent(Long eventId);
    //?1 toma el primer parametro del metodo para la consulta.

    @Query("SELECT c FROM Comment c WHERE c.user_id = ?1")
    List<Comment> findAllCommentsByUser(Long userId);

}
