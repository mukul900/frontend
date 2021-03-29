import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { FoodIndexComponent } from './home/food-index/food-index.component';
import { FoodListComponent } from './home/food-list/food-list.component';
import { FoodViewComponent } from './home/food-view/food-view.component';

const routes: Routes = [
 {
   path:"auth",
   loadChildren:()=>import('./auth/auth.module').then((obj)=>obj.AuthModule)
 },
 {
   path:"home",
   loadChildren:()=>import('./home/home.module').then((obj)=>obj.HomeModule),
  canActivate:[AuthGuard]
 },
 {
   path:"",
   redirectTo:"home",
   pathMatch:"full"
 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
