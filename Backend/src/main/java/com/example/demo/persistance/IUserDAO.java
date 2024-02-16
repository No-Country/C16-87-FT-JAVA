package com.example.demo.persistance;

import com.example.demo.entities.User;

import java.util.List;

public interface IUserDAO{

    List<User> findAll();
    User findById(Long id);
    void save(User user);
    void deleteById(Long id);

}
