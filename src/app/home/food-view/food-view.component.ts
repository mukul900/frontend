import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-food-view',
  templateUrl: './food-view.component.html',
  styleUrls: ['./food-view.component.css']
})
export class FoodViewComponent implements OnInit {

  favourites:any;
  favMessage:string="No favourites";
  panelOpenState=false;
  constructor(private httpClient:HttpClient,private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    const headers={
      "Access-Control-Allow-Origin":"*"
    }
    let userId=localStorage.getItem("username");
    let token=localStorage.getItem("bearerToken");
    this.httpClient.get<any>("http://localhost:9003/api/v1/list/"+userId,
    {headers:new HttpHeaders().set('authorization',`Bearer ${token}`)})
    .subscribe(data=>{
      console.log(data);
      this.favourites=data;
      this.spinner.hide();
      if(this.favourites.length>0){
        this.favMessage="Favourites List"
        
      }
    },
    error=>{
      console.log(error);
    })
  }

  deleteFavourite(key:any)
  {
    this.spinner.show();
    let foodId=this.favourites[key].fdcId;
    console.log(foodId)
    let token=localStorage.getItem("bearerToken");
    let userId=localStorage.getItem("username");
    console.log(userId)
    console.log(token)
    console.log("http://localhost:9003/api/v1/delete/"+userId+"/"+foodId)
    this.httpClient.delete("http://localhost:9003/api/v1/delete/"+userId+"/"+foodId,
    {headers:new HttpHeaders().set("authorization",`Bearer ${token}`)})
     .subscribe(response=>{
       console.log(response);
      this.spinner.hide();
     })
  }


}
