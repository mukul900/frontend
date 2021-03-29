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
  }

  routeToFavourites(){
    let userCheck=localStorage.getItem("username");
    if(userCheck!==null)
      this.router.navigate(['/home/view']);
    else
    {
      alert(`You should login first`);
      this.router.navigate(['/home']);
    }
  }
  onClick(){
    if(this.loginStatus=="logout")
    {
    this.loginStatus="login"
    }else
    {
      this.loginStatus="logout"
    }
    localStorage.removeItem("username");
    localStorage.removeItem("bearerToken");
    alert("Successfully logged out");
   this.router.navigate(['/auth/login']);
  }

  profileClick(){
    this.router.navigate(['/home/list']);
  }
}
