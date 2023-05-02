package com.example.appepharma.dtos;

import com.example.appepharma.models.Position;
import com.example.appepharma.models.User;

public class RegistrationDto {
    private String username;
    private String password;
    private String email;
    private String type;
    private Position position;

    public User toUser() {
        return new User(username, password, email, Integer.parseInt(type), position);
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Position getPosition() {
        return position;
    }

    public void setPosition(Position position) {
        this.position = position;
    }
}
