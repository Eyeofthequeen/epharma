package com.example.appepharma.dtos;

import org.springframework.security.core.userdetails.UserDetails;

import net.minidev.json.JSONObject;

public class UserDto {
    private UserDetails user;
    private String token;

    public UserDto(UserDetails user, String token) {
        this.user = user;
        this.token = token;
    }

    public JSONObject toJSON() {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("user", this.user);
        jsonObject.put("token", this.token);
        return jsonObject;
    }
}
