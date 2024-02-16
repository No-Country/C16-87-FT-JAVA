package com.example.demo.repository;

import com.example.demo.entities.Comment;
import org.springframework.data.repository.CrudRepository;

public interface CommentInterface extends CrudRepository<Comment,Long> {
}
