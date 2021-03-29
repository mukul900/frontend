import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


export class RegisterComponent implements OnInit {

  constructor(private commonService:CommonService) { }

  user=new FormGroup({
    email:new FormControl(),
    username:new FormControl(),
    password:new FormControl(),
    image:new FormControl()
  })
  src:any;
  fileToUpload: any;
  ngOnInit(): void {
  }

  public loadFile(files:any) {
    console.log(files.target.files);
    
    let formData = new FormData();
    formData.append("profileImage",files.target.files);
    console.log(formData.getAll)
  }

  onSubmit(){
    console.log(this.user.value);
    this.commonService.registerUser(this.user.value)
    .subscribe(response=>{
      console.log(response);
    },
    error=>{
      console.log(error);
    }
    )
  }

}
