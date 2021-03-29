import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators'
import {Observable} from 'rxjs'
import { FormGroup } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private httpClient:HttpClient) {

  }

  registerUser(data:any){
    return this.httpClient.post<JSON>("http://localhost:9001/api/v1/new/user",data);
  }

  authenticateUser(data: any) {
    console.log(data.username);
    console.log(data.password);
    
    
   return this.httpClient.post<JSON>("http://localhost:9001/api/v1/auth",data);
  }

  setBearerToken(token: any) {
    localStorage.setItem("bearerToken",token);
  }

  getBearerToken() {
    return localStorage.getItem("bearerToken");
  }

  isUserAuthenticated(token:any): Promise<any> {
      return this.httpClient.post("http://localhost:3000/auth/v1/isAuthenticated",{},{
        headers:new HttpHeaders().set("Authorization",`Bearer ${token}`)
      }).toPromise();
      //
      // return this.httpClient.post("http://localhost:3000/auth/v1/isAuthenticated",{},{
      //   headers:new HttpHeaders().set("Authorization",`Bearer ${token}`)
      // });
  }

}
