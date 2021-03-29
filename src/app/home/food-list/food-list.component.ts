import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.css']
})
export class FoodListComponent implements OnInit {

  userDetails:any;
  constructor(private httpClient:HttpClient) { }

  ngOnInit(): void {
    let userId=localStorage.getItem("username");
    let token=localStorage.getItem("bearerToken");
    this.httpClient.get("http://localhost:9001/api/v1/user/"+userId,
    {headers:new HttpHeaders().set("authorization",`Bearer ${token}`)})
    .subscribe(response=>{
     // this.userDetails.email=response
      this.userDetails=response;
      console.log(response);
    },
    error=>{
      console.log(error.message);
    })
  }

}
