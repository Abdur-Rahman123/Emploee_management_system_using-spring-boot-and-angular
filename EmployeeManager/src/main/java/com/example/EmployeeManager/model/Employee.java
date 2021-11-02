package com.example.EmployeeManager.model;

import com.sun.istack.NotNull;
import net.bytebuddy.dynamic.loading.InjectionClassLoader;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.io.Serializable;

@Entity
public class Employee implements Serializable {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    @Column(nullable = false,updatable = false)
    private Long id;
    @NotBlank(message = "Name can't be Empty")
    private String name;
    @Size(min=2,message = "Email should be atLeast 2 char")
    private String email;
    private String jobTitle;
    private String phone;
    private String imgUrl;
    @Column(nullable = false,updatable = false)
    private String employeeCode;

    public Employee(){}

    public Employee(Long id,String name,String email,String jobTitle,String phone,String imgUrl,String employeeCode){
        this.id=id;
        this.name=name;
        this.email=email;
        this.jobTitle=jobTitle;
        this.phone=phone;
        this.imgUrl=imgUrl;
        this.employeeCode=employeeCode;
    }
    public Long getId(){
        return this.id;
    }
    public void setId(Long id){
        this.id=id;
    }

    public String getName(){
        return this.name;
    }
    public void setName(String name){
        this.name=name;
    }
    public String getEmail(){
        return this.email;
    }
    public void setEmail(String email){
        this.email=email;
    }
    public String getJobTitle(){
        return this.jobTitle;
    }
    public void setJobTitle(String jobTitle){
        this.jobTitle=jobTitle;
    }
    public String getPhone(){
        return this.phone;
    }
    public void setPhone(String phone){
        this.phone=phone;
    }
    public String getImgUrl(){
        return this.imgUrl;
    }
    public void setImgUrl(String imgUrl){
        this.imgUrl=imgUrl;
    }
    public String getEmployeeCode(){
        return this.employeeCode;
    }
    public void setEmployeeCode(String employeeCode){
        this.employeeCode=employeeCode;
    }
    @Override
    public String toString() {
        return "Employee{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", jobTitle='" + jobTitle + '\'' +
                ", phone='" + phone + '\'' +
                ", imagUrl='" + imgUrl + '\'' +
                '}';
    }

}
