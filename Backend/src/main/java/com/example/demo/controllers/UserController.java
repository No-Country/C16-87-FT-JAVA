package com.example.demo.controllers;

import com.example.demo.dto.UserDTO;
import com.example.demo.entities.User;
import com.example.demo.service.IUserService;
import com.example.demo.utils.JWTUtil;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
public class UserController {
    private final IUserService userService;
    private final JWTUtil jwtUtil;
    //codigo de geolocalizacion
    @Autowired
    private RestTemplate restTemplate;
    //RestTemplate es una clase asincrona, la misma espera la respuesta de la ubicacion para continuar,
    //en el front se deja un cartel  que diga "cargando ubicacion"
    private static final String API_URL = "http://ip-api.com/json";

    public UserController(IUserService userService, JWTUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    private boolean validateToken(String token, Long userIdComparable) {
        String userId = jwtUtil.getKey(token);
        return userId.equals(userIdComparable.toString());
    }

    @PostMapping("/save")
    public ResponseEntity<?> saveUser(@RequestBody UserDTO userDTO) throws URISyntaxException {
        Date currentDate = new Date();
        if (userDTO.getUserName().isBlank()) {
            return ResponseEntity.badRequest().build();
        }
        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        String hash  = argon2.hash(1, 1024, 1, userDTO.getPassword());


        User user = User.builder()
                .userName(userDTO.getUserName())
                .lastName(userDTO.getLastName())
                .email(userDTO.getEmail())
                .password(hash) // se setea el hash, no el password literal
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
                        .isActive(user.isActive())
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
    public ResponseEntity<?> disableUser(@PathVariable Long id, @RequestHeader(value="Authorization") String token){

        if (validateToken(token,id)) {

            Optional<User> userOptional = userService.findById(id);

            if (userOptional.isPresent()) {
                User user = userOptional.get();
                user.setActive(false);
                userService.save(user);
                return ResponseEntity.ok("Successfully disabled");
            }
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.status(HttpStatusCode.valueOf(401)).body("Invalid token");
    }

    @PostMapping("/login/{email}/{password}")
    public ResponseEntity<?> login(@PathVariable String email, @PathVariable String password) {
        Optional<User> userOptional = userService.findByUsernameAndPassword(email);

        if(userOptional.isEmpty()){
            return ResponseEntity.ok("User not found");
        }

        User user=userOptional.get();
        System.out.println("true pass:  "+user.getPassword());

        UserDTO userDTO= UserDTO.builder()
                .userName(user.getUserName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .build();


        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        String hash  = argon2.hash(1, 1024, 1, password);
        System.out.println(" hashed pass entered:  "+ hash);

        if(argon2.verify(user.getPassword(), password)){
            String tokenJwt = jwtUtil.create(String.valueOf(user.getUserId()), user.getEmail());
            System.out.println("tokenjwt"+tokenJwt);

            return ResponseEntity.ok(tokenJwt);
        }
        System.out.println("passss"+password);
        return ResponseEntity.ok("Incorrect password");


    }
    //getCoordenadas
    http://ip-api.com/json/24.48.0.1
    @PostMapping("API_URL/{24.48.0.1}")
    public ResponseEntity<?> location(@PathVariable int getLocalication) {




    }
    public ResponseEntity<?> getLocation(String ip) {

        String url = API_URL + ip;
        IpData ipData = restTemplate.getForObject(url, IpData.class);

        // ... procesar datos
    }
}
