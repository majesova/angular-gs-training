import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';
import { Customer } from '../customer';

import 'rxjs/add/operator/debounceTime';


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
    emailMessage: string;

    private validationMessages = {
        required: 'Please enter your valid email',
        pattern: 'Please enter a valid email address'
    }

    get addresses(): FormArray{
        return <FormArray>this.customerForm.get('addresses');
    }

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
            sendCatalog: true,
            addresses: this.fb.array([ this.buildAddress() ])
        });

        this.customerForm.get('notification').valueChanges.subscribe(value => this.setNotification(value));

        const emailCtrl = this.customerForm.get("emailGroup.email");
        emailCtrl.valueChanges.debounceTime(1000).subscribe(value=>this.setMessage(emailCtrl));

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


    setMessage(c:AbstractControl):void{
        this.emailMessage = '';
        if((c.touched || c.dirty) && c.errors){
            this.emailMessage = Object.keys(c.errors).map(key=> this.validationMessages[key]).join(' ');
        }
    }

    //adresses
    addAddress(): void {
        this.addresses.push(this.buildAddress());
    }

    buildAddress(): FormGroup {
        return this.fb.group({
                addressType: 'home',
                street1: '',
                street2: '',
                city: '',
                state: '',
                zip: ''
        });
    }

}
