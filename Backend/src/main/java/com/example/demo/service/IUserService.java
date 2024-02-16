package com.example.demo.service;

import com.example.demo.entities.User;

import java.util.List;

public interface IUserService {
    List<User> findAll();
    User findById(Long id);
    void save(User user);
    void deleteById(Long id);
}
