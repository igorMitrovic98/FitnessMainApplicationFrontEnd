import { Component, NgModule } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';
import { StateService } from '../../services/state.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  form:FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    city: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    confirm: new FormControl('')
  });
  constructor(private userService:UserService,private formBuilder:FormBuilder,
              private stateService:StateService,private snackBar:MatSnackBar){
    
    this.data = this.stateService.getUserData();
    this.getAvatar();
    console.log(this.getUserData());
    this.dataByUsername = this.getUserData();
    console.log(this.dataByUsername);

  }

  avatar:any;
  data: User | undefined;
  newAvatar:any;
  changeAvatar:any;
  dataByUsername:any;

  private getAvatar() {
    this.userService.getAvatarByUsername(this.userService.thename).subscribe((res) => {
      this.avatar = URL.createObjectURL(res);
    });
  }

  private getUserData(){
  this.userService.getUserByUsername(this.userService.thename).subscribe((res)=>{
      this.dataByUsername=res;
      console.log(this.dataByUsername);
      this.form = this.formBuilder.group({
        username: [this.dataByUsername?.username,Validators.required],
        password: [this.dataByUsername?.password, [Validators.required,Validators.minLength(6)]],
        city: [this.dataByUsername?.city,Validators.required],
        firstName: [this.dataByUsername?.firstName, Validators.required],
        lastName: [this.dataByUsername?.lastName, Validators.required],
        email: [this.dataByUsername?.email, Validators.required],
        confirm: [null, Validators.required]
      });
      this.form.controls['username'].disable();
    })
  }

  saveChanges(){
    this.userService.updateUser(this.userService.thename, this.form.value).subscribe((result: any) => {
      this.snackBar.open("Account updated successfully.", undefined, {
        duration: 3000
      });
      this.getUserData();
    },
    (error:any)=>{
      this.snackBar.open("Email is already taken.", undefined, {
        duration: 3000
      });
      this.getUserData();
    }
    );
  }
  
  updateAvatar(){
    if (this.newAvatar === undefined) {
      this.snackBar.open("Invalid avatar, choose another.", undefined, {
        duration: 3000
      });
      return;
    }
    let formData: FormData = new FormData();
    formData.append('avatar', this.newAvatar);
    // @ts-ignore
    formData.append('username', this.userService.thename);

    this.userService.updateAvatar(formData).subscribe((result: any) => {
      this.snackBar.open("Avatar updated successfully.", undefined, {
        duration: 3000
      });
      this.changeAvatar = undefined;
      this.getAvatar();
    });
  }


  

  imageChanged(event : Event){
    const inputElement = event.target as HTMLInputElement;
    // @ts-ignore
    const fileList: FileList = inputElement.files;

    if (fileList.length > 0) {
      this.newAvatar = fileList[0];
    } else {
      this.newAvatar = null;
    }
    
  }
}
