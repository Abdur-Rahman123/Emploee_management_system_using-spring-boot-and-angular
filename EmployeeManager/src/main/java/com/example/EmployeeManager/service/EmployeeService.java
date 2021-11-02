package com.example.EmployeeManager.service;

import com.example.EmployeeManager.exception.UserNotFoundException;
import com.example.EmployeeManager.model.Employee;
import com.example.EmployeeManager.repo.EmployeeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class EmployeeService {
private final EmployeeRepo employeeRepo;

     @Autowired
    public EmployeeService(EmployeeRepo employeeRepo) {
        this.employeeRepo = employeeRepo;
    }
    public Employee addEmployee(Employee employee){
         employee.setEmployeeCode(UUID.randomUUID().toString());
         return employeeRepo.save(employee);
    }
    public List<Employee> findAllEmployee(){
         return employeeRepo.findAll();
    }
    public Employee updateEmployee(Employee employee){
         return employeeRepo.save(employee);
    }
    public Employee findEmployeeById(Long id){
         return employeeRepo.findEmployeeById(id).orElseThrow(()->new UserNotFoundException("user by id "+id+"not found"));
    }
    public void deleteEmployee(Long id){
        Employee employee = employeeRepo.findById(id).orElseThrow(()->new UserNotFoundException("use by id  "+id+"not found"));
         employeeRepo.delete(employee);
    }
}
