package com.example.demo.controllers;

import com.example.demo.dto.UserDTO;
import com.example.demo.entities.User;
import com.example.demo.service.IUserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
public class UserController {
    private final IUserService userService;

    public UserController(IUserService userService) {
        this.userService = userService;
    }

    @PostMapping("/save")
    public ResponseEntity<?> saveUser(@RequestBody UserDTO userDTO) throws URISyntaxException {
        Date currentDate = new Date();
        if (userDTO.getUserName().isBlank()) {
            return ResponseEntity.badRequest().build();
        }
        User user = User.builder()
                .userName(userDTO.getUserName())
                .lastName(userDTO.getLastName())
                .email(userDTO.getEmail())
                .password(userDTO.getPassword())
                .age(userDTO.getAge())
                .description(userDTO.getDescription())
                .position(userDTO.getPosition())
                .location(userDTO.getLocation())
                .createdOn(currentDate)
                .isActive(true)
                .build();
        userService.save(user);

        return ResponseEntity.created(new URI("/api/user/save")).build();
    }

    @GetMapping("/findAll")
    public ResponseEntity<?> findAll(){
        List<UserDTO> userListDTO = userService.findAll()
            .stream()
                .map(user -> UserDTO.builder()
                        .userId(user.getUserId())
                        .userName(user.getUserName())
                        .lastName((user.getLastName()))
                        .email(user.getEmail())
                        .age(user.getAge())
                        .description(user.getDescription())
                        .position(user.getPosition())
                        .location(user.getLocation())
                        .build()

                ).toList();
        return ResponseEntity.ok(userListDTO);
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody UserDTO userDTO){
        Optional<User> userOptional = userService.findById(id);

        if(userOptional.isPresent()){
            User user = userOptional.get();
            user.setUserName(userDTO.getUserName());
            user.setLastName(userDTO.getLastName());
            user.setEmail(userDTO.getEmail());
            user.setAge(userDTO.getAge());
            user.setDescription(userDTO.getDescription());
            user.setLocation(userDTO.getLocation());

            userService.save(user);
            return ResponseEntity.ok("Successfully Updated");
        }
        return ResponseEntity.notFound().build();
    }
    @PutMapping("/disable/{id}")
    public ResponseEntity<?> disableUser(@PathVariable Long id){
        Optional<User> userOptional = userService.findById(id);

        if(userOptional.isPresent()){
            User user = userOptional.get();
            user.setActive(false);
            userService.save(user);
            return ResponseEntity.ok("Successfully disabled");
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/login/{email}/{password}")
    public ResponseEntity<?> login(@PathVariable String email, @PathVariable String password)
    {


        Optional<User> userOptional = userService.findByUsernameAndPassword(email,password);

        if(userOptional.isEmpty()){



            return ResponseEntity.ok("User not found");
        }

        User user=userOptional.get();

        UserDTO userDTO= UserDTO.builder()
                .userName(user.getUserName())
                .lastName((user.getLastName()))
                .email(user.getEmail()).build()
                ;




        return ResponseEntity.ok(userDTO);

    }
}
