package com.example.appepharma.repositories;

import org.springframework.data.repository.CrudRepository;

import com.example.appepharma.models.Response;

public interface ResponseRepository extends CrudRepository<Response, Long> {
    <T extends Response> T save(T response);
}
