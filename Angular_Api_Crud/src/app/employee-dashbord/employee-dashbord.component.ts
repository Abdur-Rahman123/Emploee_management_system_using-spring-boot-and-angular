import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee-dashbord.model';
import { Validators } from '@angular/forms';
import { MustMatch } from './MustMatch';
@Component({
  selector: 'app-employee-dashbord',
  templateUrl: './employee-dashbord.component.html',
  styleUrls: ['./employee-dashbord.component.css']
})
export class EmployeeDashbordComponent implements OnInit {

  formValue!: FormGroup;
  EmployeeModelObj:EmployeeModel=new EmployeeModel();
  employeeData!:any;
  showAdd!:boolean;
  searchValue:string;
  showUpdate!:boolean;
  submitted=false;
  constructor(private formBuilder: FormBuilder,private api:ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      jobTitle:['',[Validators.required]],
      phone:['',[Validators.required,Validators.minLength(6)]],
      imgUrl:['',[Validators.required]],
      employeeCode:['',[Validators.required,Validators.minLength(3)]],
      password:['',[Validators.required,Validators.minLength(4)]],
      confirmPassword:['',Validators.required],
    },{
      validator:MustMatch('password','confirmPassword')
    })
    this.getAllEmployees();
  }
  get f() { return this.formValue.controls; }
  clickAddEmployee(){
    this.formValue.reset();
    this.showAdd=true; 
    this.showUpdate=false;
  }
  postEmployee(){
    this.submitted=true;
    if (this.formValue.invalid) {
      return;
  }else{
    
    this.EmployeeModelObj.name=this.formValue.value.name;
    this.EmployeeModelObj.email=this.formValue.value.email;
    this.EmployeeModelObj.jobTitle=this.formValue.value.jobTitle;
    this.EmployeeModelObj.phone=this.formValue.value.phone;
    this.EmployeeModelObj.imgUrl=this.formValue.value.imgUrl;
    this.EmployeeModelObj.employeeCode=this.formValue.value.employeeCode;
    this.api.postEmployee(this.EmployeeModelObj).subscribe(res => {
      console.log(res);
      let ref=document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getAllEmployees();
    },
    err=>{
      alert("something wrong happened")
    })
  }
  }
  //get employee
  getAllEmployees(){
  this.submitted=false;
    this.api.getEmployee().subscribe(res=>{
      this.employeeData = res;
    })
  }

  //deleteEmployee
  deleteEmployee(id:number){
    this.api.deleteEmployee(id).subscribe(res=>{
      alert("this employee Deleted");
      this.getAllEmployees();
    })
  }

  onUpdate(row:any){
    this.showAdd=false; 
    this.showUpdate=true;
    this.employeeData.id=row.id;
    this.formValue.controls["name"].setValue(row.name);
    this.formValue.controls["email"].setValue(row.email);
    this.formValue.controls["jobTitle"].setValue(row.jobTitle);
    this.formValue.controls["phone"].setValue(row.phone);
    this.formValue.controls["imgUrl"].setValue(row.imgUrl);
    this.formValue.controls["employeeCode"].setValue(row.employeeCode);
  }

  postUpdate(){
    this.EmployeeModelObj.id=this.employeeData.id;
    this.EmployeeModelObj.name=this.formValue.value.name;
    this.EmployeeModelObj.email=this.formValue.value.email;
    this.EmployeeModelObj.jobTitle=this.formValue.value.jobTitle;
    this.EmployeeModelObj.phone=this.formValue.value.phone;
    this.EmployeeModelObj.imgUrl=this.formValue.value.imgUrl;
    this.EmployeeModelObj.employeeCode=this.formValue.value.employeeCode;
    this.api.updateEmployee(this.EmployeeModelObj,this.employeeData.id).subscribe(res => {
      console.log(res);
      let ref=document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getAllEmployees();
    },
    err=>{
      alert("something wrong happened")
    })
  }

}
