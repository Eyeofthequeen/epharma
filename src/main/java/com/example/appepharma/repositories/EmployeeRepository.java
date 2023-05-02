package com.example.appepharma.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.example.appepharma.models.Employee;

public interface EmployeeRepository extends CrudRepository<Employee, Long> {
    List<Employee> findAll();
    <T extends Employee> T save(T employee);
}
