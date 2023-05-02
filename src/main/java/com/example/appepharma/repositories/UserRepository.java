package com.example.appepharma.repositories;

import org.springframework.data.repository.CrudRepository;

import com.example.appepharma.models.User;

// @Repository implicit by extention
public interface UserRepository extends CrudRepository<User, Long> {
    User findByUsername(String username);
    User findByEmail(String email);
    <S extends User> S save(S user);
}
