import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
//Own components
import { AppComponent } from './app.component';
import {WelcomeComponent} from './home/welcome.component';
import {ProductService} from './product.service';
import { ProductGuard } from './products/product.guard';
import { ProductModule } from './products/product.module';
import { ApproutingModule } from './approuting.module';
import { SignupComponent } from './account/signup/signup.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [//#1- c/u solo va en un único módulo, #2 componentes, directivas y pipes, #3 todo es privado por default para el módulo, #4 resolución detemplates para sus propios componentes
    AppComponent,
    WelcomeComponent,
    SignupComponent
  ],
  imports: [//#1 hace visibles todos los exports, #2 importa los que necesites, #3 no provee acceso a los otros módulos incluidos
    BrowserModule,
    HttpClientModule,
    ProductModule,
    ApproutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ProductService, ProductGuard, FormBuilder],
  bootstrap: [AppComponent]//#1. Punto de inicio de la aplicación, #2.- va un módulo al menos #3.- Solo va en app.module
})
export class AppModule { }
