import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { MessageService } from '../../services/message.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  sendForm:FormGroup;

  constructor(private formBuilder: FormBuilder,
              private messageService:MessageService,
              private userService:UserService,
              private snackBar:MatSnackBar) { 

    this.sendForm = this.formBuilder.group({
      content: [null, Validators.required],
    });
  }
  
  onSubmit(){
    if(this.sendForm.valid){
      const message={
        content:this.sendForm.get('content')?.value,
        seen:0,
        senderName:this.userService.thename,
        receiverName:"support"
      };
      this.messageService.support(message).subscribe();
      this.snackBar.open('Sent successfully.', 'Close', {
        duration:  2000
       });
    } 
    this.sendForm.reset();
  } 
}
