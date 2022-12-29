import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthLayoutService } from 'src/app/layout/auth-layout/auth-layout.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';

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

  constructor(public readonly authService: AuthLayoutService, private toasterService: ToasterService, public route: Router,
    private storage: StorageService, private commonService: CommonService) { }

  ngOnInit(): void {
    this.commonService.routeRole()
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
      this.authService.login(obj).subscribe(res=> {
        console.log(res);
        if (res.accessToken) {
          this.toasterService.showSuccess('User 👤', 'Login Successfully..!')
          this.storage.saveUser(res)
          this.commonService.routeRole()
        }
      })
    }
  }

  getData(controlName: any) {
    let value = this.loginForm.value[controlName]
    if(value) {
      this.field[controlName] = true
      if(controlName === 'email_phone') if(new FormControl(value, [Validators.required, Validators.pattern('[0-9]+')]).status === 'VALID') {
        console.log(controlName, value);
        this.checkEmail = false
        this.loginForm.controls[controlName].setValidators(null);
        this.loginForm.controls[controlName].addValidators([Validators.required, Validators.pattern('[0-9]+'), Validators.minLength(10)])
      } else {
        console.log(controlName, value);
        this.loginForm.controls[controlName].setValidators(null);
        this.loginForm.controls[controlName].addValidators([Validators.required, Validators.email])
        this.checkEmail = true
      }
    } else {
      this.field[controlName] = false
    }
  }
}
