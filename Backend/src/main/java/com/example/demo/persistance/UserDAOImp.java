package com.example.demo.persistance;

import com.example.demo.entities.User;
import com.example.demo.repository.UserRepository;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class UserDAOImp implements IUserDAO {
    private final  UserRepository userRepository;
    public UserDAOImp(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    @Override
    public List<User> findAll() {
        return (List<User>) userRepository.findAll();
    }


    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public void save(User user) {
        userRepository.save(user);
    }

    @Override
    public void deleteById(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public Optional<User> findByEmailAndPassword(String email) {

        return userRepository.findByEmailAndPassword(email);
    }
    @Override
    public boolean emailExists(String email) {
        return userRepository.emailExists(email);
    }
}
