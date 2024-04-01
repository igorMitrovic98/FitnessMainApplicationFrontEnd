import { Component, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { MessageService } from '../../services/message.service';
import { Message } from '../../interfaces/message';
import { CommonModule, DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  existingChats:Message[] = [];
  otherUsers:any[]=[];
  selectedUsername:any=null;
  senderAvatar:any;
  receiverAvatar:any;
  filteredMessages:Message[]=[];
  currentUser:any;
  sendForm:FormGroup;
  currentDate:Date;

  constructor(private userService:UserService,private messageService:MessageService,
    private formBuilder:FormBuilder,private snackBar:MatSnackBar,private elementRef:ElementRef){
      this.messageService.getUsers(this.userService.thename).subscribe((res:any)=>{
        this.existingChats = res;
        this.getOtherUsers();
      });
      this.currentUser = this.userService.thename;
      this.sendForm = this.formBuilder.group({
        content: [null, Validators.required],
      });
      this.currentDate=new Date();
  }

  getOtherUsers(){
    this.existingChats.forEach((element :any)=> {
      if(element.senderName == this.userService.thename){
        this.otherUsers.push(element.receiverName);
      }else{
        this.otherUsers.push(element.senderName);
      }
    });
    this.otherUsers = Array.from(new Set(this.otherUsers));
  }

  numberOfUnseen(username:any){
    return this.existingChats.filter((chat:any)=> chat.senderName === username && chat.seen === 0).length;
  }

  setActiveClass(username:string){
    this.selectedUsername=username;
    this.userService.getAvatarByUsername(this.userService.thename).subscribe((res) => {
      this.senderAvatar = URL.createObjectURL(res);
    });
    this.userService.getAvatarByUsername(username).subscribe((res) => {
      this.receiverAvatar = URL.createObjectURL(res);
    });
    this.filteredMessages = this.existingChats.filter(chat => chat.senderName === username || chat.receiverName === username)
    .sort((a,b) => a.id - b.id);
    setTimeout(() => {
      this.scrollToBottom();
    }, 1000);
    this.filteredMessages.forEach(m=>m.seen = 1);
    this.messageService.updateSeen(username,this.userService.thename).subscribe();
  }

  transformDate(date:Date){
    const datePipe=new DatePipe('en-US');
    return datePipe.transform(date,'yyyy-MM-dd')
  }

  onSubmit(){
    if(this.sendForm.valid){
      const message={
        content:this.sendForm.get('content')?.value,
        seen:0,
        senderName:this.userService.thename,
        receiverName:this.selectedUsername
      };
      this.transformDate(new Date());
      var newMessage = {
        id: this.filteredMessages[this.filteredMessages.length - 1].id + 1,
        content:this.sendForm.get('content')?.value,
        seen:0,
        dateTime: this.currentDate,
        senderName:this.currentUser,
        receiverName:this.selectedUsername
      };
      this.filteredMessages.push(newMessage);
      this.messageService.support(message).subscribe();
      this.snackBar.open('Sent successfully.', 'Close', {
        duration:  1000
       });
    } 
    this.sendForm.reset();
  } 
  scrollToBottom() {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }
}
  

