import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { StateService } from '../../services/state.service';
import { CommonModule } from '@angular/common';
import { RecaptchaCommonModule } from 'ng-recaptcha/lib/recaptcha-common.module';

@Component({
  selector: 'app-register',
  standalone: true, 
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  form: FormGroup;
  captchaResolved:boolean=false;
  // @ts-ignore
  public image: File | null;
  constructor(private formBuilder: FormBuilder,
              private userService:UserService,
              private router:Router,
              private snackBar:MatSnackBar,
              private stateService:StateService) {

    this.form = this.formBuilder.group({
      username: [null,Validators.required],
      password: [null, [Validators.required,Validators.minLength(6)]],
      city: [null,Validators.required],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, Validators.required],
      confirm: [null, Validators.required]
    });
   }
   

 
   handleImageChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    // @ts-ignore
    const fileList: FileList = inputElement.files;

    if (fileList.length > 0) {
      this.image = fileList[0];
    } else {
      this.image = null;
    }
  }

  public register(form: FormGroup) {

    // @ts-ignore
    this.userService.register(form).subscribe(res => {
      if (this.image != null) { 
        let formData: FormData = new FormData();
        formData.append("avatar", this.image);
        formData.append("username", res.usename);
        this.userService.uploadAvatar(formData).subscribe();
      } else if (this.image == null) { 
        this.userService.uploadDefault(res.username).subscribe();
      }
      this.stateService.setUserData({username: res.username, firstName: res.firstName, lastName: res.lastName, activated: res.activated});
      this.snackBar.open("To activate your account, follow the link sent to your email address.", undefined, {
        duration: 3000
      });
      this.router.navigate(['']);
    });

  }
  
}  


