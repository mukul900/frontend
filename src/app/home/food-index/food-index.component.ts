import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {HttpClient,HttpHeaders} from '@angular/common/http'
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { Input } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
declare var $:any;
declare var Swiper:any;

@Component({
  selector: 'app-food-index',
  templateUrl: './food-index.component.html',
  styleUrls: ['./food-index.component.css']
})
export class FoodIndexComponent implements OnInit {

  panelOpenState = false;
  // nutrients={
  //   name:"",
  //   number:"",
  //   unit:""
  // }
  Results:string="Recommended Foods";
  food=new FormControl();
  constructor(private httpClient:HttpClient,private spinner:NgxSpinnerService) { }
  highfields:any;
  favourites={
    food:"",
    score:""
  }

 selected=false;
  
  ngOnInit(): void {

    this.spinner.show();
    var swiper = new Swiper('.swiper-container', {
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      slidesPerView: 4,
      loop:true
    });
    console.log(this.food.value);
    const headers={
      "api_key":"Lcis769TnWTUYdMtkVoOeiYYUbwuZoeahPmQ7I2F",
      "query":this.food.value
    }
    this.httpClient.get<any>("http://localhost:9002/api/v1/recommendation")
    .subscribe(data=>{
      console.log(data)
      this.highfields=data[data.length-1].foods;
      $(document).ready(function(){
        $('[data-toggle="tooltip"]').tooltip();
      });
      this.spinner.hide();
    },
    error=>{
      console.log(error);
      this.spinner.hide();
    })
    
  }

  searchFood()
  {
    this.spinner.show();
    this.Results="Search Results";
    console.log(this.food.value);
    const headers={
      "api_key":"Lcis769TnWTUYdMtkVoOeiYYUbwuZoeahPmQ7I2F",
      "query":this.food.value
    }
    this.httpClient.get<any>("https://api.nal.usda.gov/fdc/v1/foods/search",{params:headers})
    .subscribe(data=>{
      console.log(data.foods);
      this.highfields=data.foods;
      $(document).ready(function(){
        $('[data-toggle="tooltip"]').tooltip();
      });
      this.spinner.hide();
    },
    error=>{
      console.log(error);
      this.spinner.hide();
    })
    //this.spinner.hide();
  }


  public toggleSelected(key:any) {
    let userCheck=localStorage.getItem("username");
    if(userCheck!==null)
    {
    if(this.highfields[key].favourite){
      this.highfields[key].favourite=false;
      let userId;
      let foodId=this.highfields[key].fdcId;
      userId=localStorage.getItem("username");
      let token=localStorage.getItem("bearerToken");
      console.log(this.highfields[key])
      //console.log("http://localhost:9002/api/v1/delete/?userId="+userId+"?fdcId="+foodId);
      this.httpClient.delete("http://localhost:9003/api/v1/delete/"+userId+"/"+foodId,
     {headers:new HttpHeaders().set("authorization",`Bearer ${token}`)})
      .subscribe(response=>{
        console.log(response);
      })
    }
    else{
      this.highfields[key].favourite=true;
      let userId;
      let foodId=this.highfields[key].fdcId;
      userId=localStorage.getItem("username");
      let token=localStorage.getItem("bearerToken");
      console.log(this.highfields[key])
      //console.log("http://localhost:9002/api/v1/add/?userId="+userId+"?fdcId="+foodId);
      this.httpClient.post("http://localhost:9003/api/v1/add/"+userId,this.highfields[key],
     {headers:new HttpHeaders().set("authorization",`Bearer ${token}`)})
      .subscribe(response=>{
        console.log(response);
      },
      error=>{
        alert("Already exists in favourites");
      })
    }
  }
  else
  {
    alert(`You should login first`);
  }

  }
}
