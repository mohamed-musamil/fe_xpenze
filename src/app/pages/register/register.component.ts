import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CONSTANT_CONFIG } from 'src/app/app.constant';
import { AuthLayoutService } from 'src/app/layout/auth-layout/auth-layout.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  config = CONSTANT_CONFIG.TOAST_CONFIG;
  isSubmitted:boolean = false
  registerForm: FormGroup;
  checkEmail : boolean = false;
  field: any = {
    email_phone : false,
    password : false
  }

  constructor(public readonly authService: AuthLayoutService, private toasterService: ToasterService) {

  }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      username : new FormControl('', [Validators.required]),
      email : new FormControl('', [Validators.required, Validators.email]),
      phoneno : new FormControl('', [Validators.required, Validators.minLength(10)]),
      password : new FormControl('', [Validators.required, Validators.minLength(6)]),
    })
  }

  getData(controlName: any) {
    this.toasterService.showSuccess('User', 'Login Successfully');
    let value = this.registerForm.value[controlName]
    if(value) {
      this.field[controlName] = true
    } else {
      this.field[controlName] = false
    }
  }

  submitForm() {
    if(this.registerForm.status === 'INVALID') this.registerForm.markAllAsTouched();
    if(this.registerForm.status === 'VALID') {
      this.isSubmitted = true
      let obj = this.registerForm.value;
      obj["roles"] = ["Admin"]
      this.authService.register(obj).subscribe(res=> {
        if(res) {
          this.toasterService.showToast(this.config.SAVED,'success', res.message);
        }
      })
      this.isSubmitted = false;
    }
  }
}
