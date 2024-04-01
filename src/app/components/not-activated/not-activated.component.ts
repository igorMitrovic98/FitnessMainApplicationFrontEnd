import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-not-activated',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './not-activated.component.html',
  styleUrl: './not-activated.component.css'
})
export class NotActivatedComponent {
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
      this.userService.nonactive(user).subscribe();
    } 
  } 
}
