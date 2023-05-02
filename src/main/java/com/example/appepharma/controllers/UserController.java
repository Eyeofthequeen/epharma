package com.example.appepharma.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.appepharma.dtos.UserDto;
import com.example.appepharma.models.User;
import com.example.appepharma.repositories.UserRepository;


@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/save")
    public ResponseEntity<String> save(@RequestHeader("Authorization") String token, @RequestBody User user) {
        String jwt = token.substring(7); // Remove the Bearer prefix
        UserDto dto = new UserDto(userRepository.save(user), jwt);
        return ResponseEntity.ok(dto.toJSON().toString());
    }
}
