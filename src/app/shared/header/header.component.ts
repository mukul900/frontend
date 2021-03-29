import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loginStatus:string="logout";
  constructor(private router:Router) { }

  ngOnInit(): void {
    if(localStorage.getItem("bearerToken")!==null)
    {
      this.loginStatus="logout"
    }
    else
    {
      this.loginStatus="login";
    }
  }

  routeToFavourites(){
    let userCheck=localStorage.getItem("username");
    if(userCheck!==null)
      this.router.navigate(['/home/view']);
    else
    {
      alert(`You should login first`);
    }
  }
  onClick(){
    if(this.loginStatus=="logout")
    {
      alert("Successfully logged out");
      localStorage.removeItem("username");
      localStorage.removeItem("bearerToken");
      this.router.navigate(['/auth/login']);
      this.loginStatus="login"
    }else
    {
      this.router.navigate(['/auth/login']);
    } 
    
  }

  profileClick(){
    let profileAvail=localStorage.getItem("username");
    if(profileAvail!==null)
      this.router.navigate(['/home/list']);
    else
      alert(`You should login first`)
  }
}
