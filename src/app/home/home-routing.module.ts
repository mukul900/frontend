import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FoodIndexComponent } from './food-index/food-index.component';
import { FoodListComponent } from './food-list/food-list.component';
import { FoodViewComponent } from './food-view/food-view.component';

const routes: Routes = [
  
  {
    path: "",
    component: FoodIndexComponent,
  },
  {
    path: "view",
    component: FoodViewComponent
  },
  {
    path: "list",
    component: FoodListComponent
  },
  {
    path:"index",
    component:FoodIndexComponent
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
