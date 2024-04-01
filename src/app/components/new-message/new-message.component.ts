import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { MessageService } from '../../services/message.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../../interfaces/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-message',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './new-message.component.html',
  styleUrl: './new-message.component.css'
})
export class NewMessageComponent {
  sendForm:FormGroup;
  users:User[]=[];
  
s=null;
  constructor(private formBuilder: FormBuilder,
              private messageService:MessageService,
              private userService:UserService,
              private snackBar:MatSnackBar,
              private router:Router) { 
    this.userService.getAllUsers().subscribe((res)=>{
      //@ts-ignore
      this.users = res;
      this.users = this.users.filter(u=> u.username !== this.userService.thename);
      this.users = this.users.filter(u=>u.activated ===1);
    });
    this.sendForm = this.formBuilder.group({
      content: [null, Validators.required],
      user: [null, Validators.required],
    });
  }
  onSubmit(){
    const message={
      content:this.sendForm.get('content')?.value,
      seen:0,
      senderName:this.userService.thename,
      receiverName:this.sendForm.value.user
    }
    this.messageService.support(message).subscribe();
      this.snackBar.open('Sent successfully.', 'Close', {
        duration:  2000
       });
       this.router.navigate(['/chat']);
  }

}
