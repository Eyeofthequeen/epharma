package com.example.appepharma.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.appepharma.models.Drug;

public interface DrugRepository extends CrudRepository<Drug, Long>{
    List<Drug> findAll();
    Drug findByName(String name);
    <T extends Drug> T save(T drug);

    @Query("SELECT d.name FROM Drug d")
    List<String> findAllNames();
}
