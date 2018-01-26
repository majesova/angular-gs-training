import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {ProductGuard} from './product.guard'
import {ProductListComponent } from './product-list/product-list.component';
import {ProductDetailsComponent} from './product-details/product-details.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forChild([
    	{path:'products', component: ProductListComponent},
    	{path:'products/:id', component: ProductDetailsComponent, canActivate:[ProductGuard]},]),
  ],
  declarations: [],
  exports:[RouterModule]
})
export class ProductRoutingModule { }
