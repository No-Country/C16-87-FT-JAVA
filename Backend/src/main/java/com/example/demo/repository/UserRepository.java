package com.example.demo.repository;

import com.example.demo.dto.UserDTO;
import com.example.demo.entities.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface UserRepository extends CrudRepository<User,Long> {
//    @Query("SELECT p FROM Product p WHERE p.price BETWEEN ?1 AND ?2")
//
// esto nos sirve para consultas personalizadas


    @Query("SELECT s FROM User s  WHERE s.email = :email and s.password  = :password and s.isActive = true")
    Optional<User> findByEmailAndPassword(String email, String password);


}


