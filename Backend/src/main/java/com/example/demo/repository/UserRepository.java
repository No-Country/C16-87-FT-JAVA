package com.example.demo.repository;

import com.example.demo.entities.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface UserRepository extends CrudRepository<User,Long> {

    @Query("SELECT COUNT(u) > 0  FROM User u WHERE u.email = :email")
    boolean emailExists(String email);

    @Query("SELECT s FROM User s  WHERE s.email = :email and s.isActive = true")
    Optional<User> findByEmailAndPassword(String email);
}


