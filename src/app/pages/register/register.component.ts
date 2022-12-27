import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CONSTANT_CONFIG } from 'src/app/app.constant';
import { AuthLayoutService } from 'src/app/layout/auth-layout/auth-layout.service';
import { StorageService } from 'src/app/shared/services/storage.service';
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

  constructor(public readonly authService: AuthLayoutService, private toasterService: ToasterService, public route: Router,
    private storage: StorageService) {

  }

  ngOnInit(): void {
    this.routeDashboard()
    this.registerForm = new FormGroup({
      username : new FormControl('', [Validators.required]),
      email : new FormControl('', [Validators.required, Validators.email]),
      phoneno : new FormControl('', [Validators.required, Validators.minLength(10)]),
      password : new FormControl('', [Validators.required, Validators.minLength(6)]),
    })
  }

  getData(controlName: any) {
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
      obj["roles"] = ["User"]
      this.authService.register(obj).subscribe(res=> {
        if(res) {
          this.isSubmitted = false;
          this.toasterService.showSuccess('User  👤', 'Created Successfully..!');
          setTimeout(() => {
            this.route.navigate(['/auth'])
          }, 1000);
        }
      })
      this.isSubmitted = false;
    }
  }

  routeDashboard() {
    if(this.storage.checkStorage()) {
      this.route.navigate(['/'])
    }
  }
}
