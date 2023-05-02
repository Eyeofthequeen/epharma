package com.example.appepharma.services.implementation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.appepharma.models.Employee;
import com.example.appepharma.repositories.EmployeeRepository;
import com.example.appepharma.services.IEmployeeService;

@Service
public class EmployeeService implements IEmployeeService {
    @Autowired
    private EmployeeRepository employeeRepos;

    public Employee save(Employee employee) {
        return employeeRepos.save(employee);
    }

    public List<Employee> findAll() {
        return employeeRepos.findAll();
    }
}
