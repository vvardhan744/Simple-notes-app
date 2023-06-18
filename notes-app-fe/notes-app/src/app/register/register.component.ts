import { ApiService } from './../api.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
 

  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService) { }

  onSubmit() {

    if (this.registerForm.invalid) {
      return;
    }

    const registerData = {
      username: this.registerForm.controls.username.value,
      password: this.registerForm.controls.password.value,
      fullName:this.registerForm.controls.fullName.value
    }

    this.apiService.register(registerData).subscribe(data => {
      //debugger;
      if (data.status === 200) {
        this.router.navigate(['login']);
      } else {
        alert(data.message);
      }
    });

  }

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.required],
      fullName:['',Validators.required]
    })
  }

  login() {
    this.router.navigate(['']);
  }

}
