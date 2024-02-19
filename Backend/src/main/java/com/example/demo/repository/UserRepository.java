package com.example.demo.repository;

import com.example.demo.entities.User;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface UserRepository extends CrudRepository<User,Long> {
//    @Query("SELECT p FROM Product p WHERE p.price BETWEEN ?1 AND ?2")   // esto nos sirve para consultas personalizadas
}


