package com.example.appepharma.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.appepharma.dtos.RegistrationDto;
import com.example.appepharma.models.User;
import com.example.appepharma.services.IRegistrationService;

@RestController
@RequestMapping("/api/auth")
public class RegistrationController {
    @Autowired
    private IRegistrationService registrationService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegistrationDto dto) {
        User registeredUser = registrationService.registerUser(dto.toUser());
        return ResponseEntity.ok(registeredUser);
    }
}
