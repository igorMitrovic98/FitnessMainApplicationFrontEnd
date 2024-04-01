import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  signinForm:FormGroup;

  constructor(private formBuilder: FormBuilder,
              private userService:UserService) {

    this.signinForm = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
    });
  }
  
  onSubmit(){
    if(this.signinForm.valid){
      const user={
        username:this.signinForm.get('username')?.value,
        password:this.signinForm.get('password')?.value
      };
      this.userService.loginUser(user).subscribe();
    } 
  } 
}
