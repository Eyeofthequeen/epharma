package com.example.appepharma.services.implementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.appepharma.models.User;
import com.example.appepharma.repositories.UserRepository;
import com.example.appepharma.services.IRegistrationService;

@Service
public class RegistrationService implements IRegistrationService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User registerUser(User user) {
        String username = user.getEmail();
        user.setUsername(username);

        if (userRepository.findByEmail(user.getEmail()) != null) {
            throw new RuntimeException("Email already exists");
        }

        // Encrypt the password
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);

        String role = "";
        if(user.getType() == "Pharmacist") {
            role = "Administration";
        } else {
            role = "User";
        }

        // Set default role(s) for the user
        String[] roles = new String[]{role};
        user.setRoles(roles);

        // Save the user entity
        return userRepository.save(user);
    }
}
