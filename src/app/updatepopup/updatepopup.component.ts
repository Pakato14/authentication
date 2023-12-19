import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-updatepopup',
  templateUrl: './updatepopup.component.html',
  styleUrls: ['./updatepopup.component.css']
})
export class UpdatepopupComponent implements OnInit {

  constructor(
    private builder: FormBuilder,
    private service: AuthService,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private toastr: ToastrService,
    private dialog: MatDialogRef<UpdatepopupComponent>
    )
    {}

    ngOnInit(): void {
      this.service.getAllRole().subscribe(res=>{
        this.roleList = res
      })
      if(this.data.userCode!=null && this.data.usercode!= ''){
        this.service.getByCode(this.data.userCode).subscribe(res =>{
          this.editData = res;
          this.registerForm.setValue({
            id:this.editData.id,
            name:this.editData.name,
            email:this.editData.email,
            password:this.editData.password,
            role:this.editData.role,
            gender:this.editData.gender,
            isactive:this.editData.isactive
          })

          console.log('editData', this.editData)

        })
      }
    }

  roleList: any;
  editData: any;

  registerForm = this.builder.group({
    id: this.builder.control(''),
    name: this.builder.control(''),
    password: this.builder.control(''),
    email: this.builder.control(''),
    gender: this.builder.control('male'),
    role: this.builder.control('', Validators.required),
    isactive: this.builder.control(false),
  });

  updateUser(){
    if(this.registerForm.valid){
      this.service.updateUser(this.registerForm.value.id, this.registerForm.value).subscribe(res=>{
        console.log('registerForm', this.registerForm.value)
        this.toastr.success('Update successfully');
        this.dialog.close();
      })

    }else{
      this.toastr.warning('Please select role')
    }

  }

}
