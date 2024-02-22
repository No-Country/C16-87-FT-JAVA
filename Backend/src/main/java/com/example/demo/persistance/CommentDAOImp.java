package com.example.demo.persistance;

import com.example.demo.entities.Comment;
import com.example.demo.repository.CommentRepository;
import com.example.demo.repository.UserRepository;
import java.util.List;
import java.util.Optional;

public class CommentDAOImp implements ICommentDAO {

    private final CommentRepository commentRepository;
    public CommentDAOImp(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    @Override
    public List<Comment> findAllCommentsByUser(Long userId) {
        return (List<Comment>) commentRepository.findAll();
    }

    @Override
    public List<Comment> findAllCommentsByEvent(Long eventId) {return (List<Comment>) commentRepository.findAll();
    }

    @Override
    public Optional<Comment> findById(Long commentId) { return ( commentRepository.findById(commentId));}


    @Override
    public void save(Comment comment) { commentRepository.save(comment);
    }
    @Override
    public void deleteById(Long commentId) {
        commentRepository.deleteById(commentId);
    }




}
