import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errMessage:string="";
  usernameError:string="";
  passwordError:string="";
  
  username=new FormControl('')
  password=new FormControl('')
 
  userReg=new FormGroup({
    email:new FormControl(),
    username:new FormControl(),
    password:new FormControl(),
    image:new FormControl()
  })

  user={
    username:"",
    password:""
  }

  constructor(private router:Router,private commonService:CommonService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    
    if(this.username.value=="" && this.password.value=="")
      this.errMessage="Fields can't be empty";
    else if(this.username.value=="" && this.password.value!=="")
      this.usernameError="Username can't be empty";
    else if(this.username.value!=="" && this.password.value=="")
      this.passwordError="Password can't be empty"
    else
    {
      this.errMessage="";
      this.usernameError="";
      this.passwordError="";
    //  console.log(this.userDetails.value);
     this.user.username=this.username.value;
     this.user.password=this.password.value;
     console.log(this.user);
     
      this.commonService.authenticateUser(this.user).subscribe(
        (response:any)=>{
          console.log(response);
          this.commonService.setBearerToken(response.token);
          localStorage.setItem("username",this.user.username);
          this.router.navigate(['/home/index'])
        },
        error=>{
            this.errMessage=error.message;
            if(error.status==403)
            {
              this.errMessage="Unauthorized";
            }
            else
            {
              this.errMessage="Http failure response for http://localhost:3000/auth/v1: 404 Not Found";
            }
        }
      );

      
    }
      
  }

  onRegSubmit(){
    console.log(this.userReg.value);
    this.commonService.registerUser(this.userReg.value)
    .subscribe(response=>{
      console.log(response);
    },
    error=>{
      console.log(error);
    }
    )
  }

}
