package com.example.demo.service;

import com.example.demo.dto.UserDTO;
import com.example.demo.entities.User;

import java.util.List;
import java.util.Optional;

public interface IUserService {
    List<User> findAll();
    Optional<User> findById(Long id);
    void save(User user);
    void deleteById(Long id);

    Optional<User> findByUsernameAndPassword(String email);
}
