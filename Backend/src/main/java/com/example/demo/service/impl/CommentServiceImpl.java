package com.example.demo.service.impl;

import com.example.demo.entities.Comment;
import com.example.demo.persistance.ICommentDAO;
import com.example.demo.service.ICommentService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommentServiceImpl implements ICommentService {

    private final ICommentDAO iCommentDAO;

    public CommentServiceImpl(ICommentDAO iCommentDAO) {
        this.iCommentDAO = iCommentDAO;
    }

    @Override
    public List<Comment> findAllCommentsByUser(Long userId) {
        return iCommentDAO.findAllCommentsByUser(userId);
    }

    @Override
    public List<Comment> findAllCommentsByEvent(Long eventId)
    {return iCommentDAO.findAllCommentsByEvent(eventId);
    }
    @Override
    public Optional<Comment> findById(Long commentId) { return ( iCommentDAO.findById(commentId));}
    @Override
    public void save(Comment comment) { iCommentDAO.save(comment);
    }
    @Override
    public void deleteById(Long commentId) {
        iCommentDAO.deleteById(commentId);
    }

}
