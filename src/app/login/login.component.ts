import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private service: AuthService,
    private router: Router
  ){
    sessionStorage.clear();
  }

  userData:any;

  loginForm = this.builder.group({
    userName: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required)
  })

  proceedLogin(){
    if(this.loginForm.valid){
      this.service.getByCode(this.loginForm.value.userName).subscribe(res=>{
        this.userData = res;
        console.log('userData', this.userData)
        if( this.userData.password === this.loginForm.value.password){
          if(this.userData.isactive){
            sessionStorage.setItem('userName', this.userData.id);
            sessionStorage.setItem('userRole', this.userData.role);
            this.router.navigate(['']);

          }else{
            this.toastr.error('Please contact admin', 'In Active User');
          }
        }else {
          this.toastr.error('Invalid credentials');
        }
      });
  }
}
}
