import { ApiService } from './../api.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  invalidLogin: boolean = false;

 


  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService) { }

  onSubmit() {

    if (this.loginForm.invalid) {
      return;
    }

    const loginPayload = {
      username: this.loginForm.controls.username.value,
      password: this.loginForm.controls.password.value
    }

    this.apiService.login(loginPayload).subscribe(data => {
      //debugger;
      if (data.status === 200) {
        window.localStorage.setItem('token', data.jwt);
        window.localStorage.setItem('username',data.username);
        this.router.navigate(['list-notes']);
      } else {
        this.invalidLogin = true;
        // alert(data.message);
      }
    });

  }

  register(){
    this.router.navigate(['register']);
  }

  ngOnInit(): void {

    window.localStorage.removeItem('token');
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.required]
    })


   

  }

}
