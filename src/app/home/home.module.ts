import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { FoodIndexComponent } from './food-index/food-index.component';
import { FoodListComponent } from './food-list/food-list.component';
import { FoodViewComponent } from './food-view/food-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatExpansionModule} from '@angular/material/expansion'
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CommonService } from '../common.service';
import { AuthGuard } from '../auth.guard';


@NgModule({
  declarations: [FoodIndexComponent, FoodListComponent, FoodViewComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatExpansionModule,
    MatIconModule,
    MatButtonModule,
    NgxSpinnerModule
  ],
  providers:[CommonService,AuthGuard]
})
export class HomeModule { }
