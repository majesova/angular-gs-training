import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';



import { AppComponent } from './app.component';
import {WelcomeComponent} from './home/welcome.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import {ConvertToSpacesPipe} from './shared/convert-to-spaces-pipe';
import { StarComponent } from './products/star/star.component';
import {ProductService} from './product.service';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { ProductGuard } from './products/product.guard';


@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ConvertToSpacesPipe,
    StarComponent,
    ProductDetailsComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
    	{path:'products', component: ProductListComponent},
    	{path:'products/:id', component: ProductDetailsComponent, canActivate:[ProductGuard]},
    	{path:'welcome', component: WelcomeComponent},
    	{path:'', redirectTo:'welcome', pathMatch:'full'},
    	{path: '***', redirectTo:'welcome',pathMatch:'full'}
    	], {useHash:true})
  ],
  providers: [ProductService, ProductGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
