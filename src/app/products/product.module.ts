import { NgModule } from '@angular/core';

import {ConvertToSpacesPipe} from '../shared/convert-to-spaces-pipe';
import {SharedModule } from './../shared/shared.module';
import {ProductRoutingModule } from './product-routing.module';
import {ProductService} from '../product.service';
import {ProductListComponent } from './product-list/product-list.component';
import {ProductDetailsComponent} from './product-details/product-details.component';
import {ProductGuard} from './product.guard'

@NgModule({
  imports: [
    SharedModule,
    ProductRoutingModule
  ],
  declarations: [
  	ProductListComponent,
    ConvertToSpacesPipe,
    ProductDetailsComponent],
   providers:[
   	ProductService,
   	ProductGuard,
   	]
})
export class ProductModule { }
