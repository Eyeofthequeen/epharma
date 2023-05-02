package com.example.appepharma.services;

import java.util.List;

import com.example.appepharma.models.Employee;

public interface IEmployeeService {
    List<Employee> findAll();
    public Employee save(Employee employee);
}
