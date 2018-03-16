import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Customer } from '../customer';


/*function ratingRange(c:AbstractControl):{[key:string]:boolean} | null{
    if(c.value != undefined && isNaN(c.value) || c.value <1 || c.value> 5){
        return {'range':true};
    }
    return null;
}*/

//Validation with parameters

function ratingRange(min:number, max:number): ValidatorFn{
    return (c:AbstractControl):{[key:string]:boolean} | null =>{
        if(c.value != undefined && isNaN(c.value) || c.value <min || c.value> max){
            return {'range':true};
        }
        return null;
    }
}

function emailMatcher(c:AbstractControl){
   let emailCtrl = c.get('email');
   let confirmEmailCtrl = c.get('confirmEmail');
   if( emailCtrl.pristine || confirmEmailCtrl.pristine){
       return null;
   }
   if(emailCtrl.value === confirmEmailCtrl.value){
       return null;
   }
   return {'match':true};
}


@Component({
  selector: 'pm-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

    customerForm: FormGroup;
    customer: Customer= new Customer();

    constructor(private fb: FormBuilder) { }

    ngOnInit(): void {
        this.customerForm = this.fb.group({
            firstName: ['',Validators.compose([Validators.required, Validators.minLength(5)])],
            lastName: ['',Validators.compose([Validators.required, Validators.maxLength(50)])],
            emailGroup: this.fb.group({
                email: ['',Validators.compose([Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')])],
                confirmEmail: ['',Validators.compose([Validators.required])],
            }, {validator:emailMatcher} ),
            phone: ['',Validators.compose([Validators.required])],
            notification:'email',
            rating:['',Validators.compose([ratingRange(1,5)]) ],
            sendCatalog: true
        });
    }

    populateTestData(): void {
        this.customerForm.patchValue({
            firstName: 'Jack',
            lastName: 'Harkness',
            sendCatalog: false
        });
    }

    clear():void {
        this.customerForm.setValue({ firstName: '',
        lastName: '',
        email: '',
        sendCatalog: true});
    }

    save() {
        console.log(this.customerForm);
        console.log('Saved: ' + JSON.stringify(this.customerForm.value));
    }

    setNotification(notifyVia:string):void{
             const phoneControl = this.customerForm.get('phone');
             if(notifyVia === 'phone'){
                 phoneControl.setValidators(Validators.required);
             }else{
                 phoneControl.clearValidators();
             }
             phoneControl.updateValueAndValidity();
    }

}
