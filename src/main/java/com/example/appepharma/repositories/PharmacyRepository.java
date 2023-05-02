package com.example.appepharma.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.example.appepharma.models.Pharmacy;

// @Repository implicit by extention
public interface PharmacyRepository extends CrudRepository<Pharmacy, Long> {
    <T extends Pharmacy> T save(T pharmacy);
    List<Pharmacy> findAll();
}
