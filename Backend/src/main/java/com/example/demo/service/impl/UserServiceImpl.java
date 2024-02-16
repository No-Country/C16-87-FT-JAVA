package com.example.demo.service.impl;

import com.example.demo.entities.User;
import com.example.demo.persistance.IUserDAO;
import com.example.demo.service.IUserService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements IUserService {
    private IUserDAO iUserDAO;

    public UserServiceImpl(IUserDAO iUserDAO) {
        this.iUserDAO = iUserDAO;
    }

    @Override
    public List<User> findAll() {
        return iUserDAO.findAll();
    }

    @Override
    public User findById(Long id) {
        return iUserDAO.findById(id);
    }

    @Override
    public void save(User user) {
        iUserDAO.save(user);
    }

    @Override
    public void deleteById(Long id) {
        iUserDAO.deleteById(id);
    }
}
