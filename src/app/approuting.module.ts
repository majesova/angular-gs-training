import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
//components
import {WelcomeComponent} from './home/welcome.component';
import { SignupComponent } from './account/signup/signup.component';


@NgModule({
  imports: [
    RouterModule.forRoot([
      {path:'welcome', component: WelcomeComponent},
      {path:'signup', component: SignupComponent},
    	{path:'', redirectTo:'welcome', pathMatch:'full'},
      {path: '***', redirectTo:'welcome',pathMatch:'full'}
    	], {useHash:false}),
  ],
  declarations: [],
  exports:[RouterModule]
})
export class ApproutingModule { }
