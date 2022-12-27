import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup;
  checkEmail : boolean = false;
  field: any = {
    email_phone : false,
    password : false
  }
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email_phone : new FormControl('', [Validators.required, Validators.minLength(2)]),
      password : new FormControl('', [Validators.required, Validators.minLength(6)]),
    })
  }

  submitForm() {
    if(this.loginForm.status === 'INVALID') this.loginForm.markAllAsTouched();
    if(this.loginForm.status === 'VALID') {
      let obj: any = {};
      obj.password = this.loginForm.value?.password
      obj[this.checkEmail ? 'email' :'phoneno'] = this.loginForm.value?.email_phone
      console.log(obj);
    }
  }

  getData(controlName: any) {
    let value = this.loginForm.value[controlName]
    if(value) {
      this.field[controlName] = true
      if(new FormControl(value, [Validators.required, Validators.pattern('[0-9]+')]).status === 'VALID') {
        this.checkEmail = false
        this.loginForm.controls[controlName].setValidators(null);
        this.loginForm.controls[controlName].addValidators([Validators.required, Validators.pattern('[0-9]+'), Validators.minLength(10)])
      } else {
        this.loginForm.controls[controlName].setValidators(null);
        this.loginForm.controls[controlName].addValidators([Validators.required, Validators.email])
        this.checkEmail = true
      }
    } else {
      this.field[controlName] = false
    }
  }
}
