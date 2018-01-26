import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
//components
import {WelcomeComponent} from './home/welcome.component';


@NgModule({
  imports: [
    RouterModule.forRoot([
    	{path:'welcome', component: WelcomeComponent},
    	{path:'', redirectTo:'welcome', pathMatch:'full'},
    	{path: '***', redirectTo:'welcome',pathMatch:'full'}
    	], {useHash:false}),
  ],
  declarations: [],
  exports:[RouterModule]
})
export class ApproutingModule { }
