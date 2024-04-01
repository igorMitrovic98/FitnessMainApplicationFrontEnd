import { Component, OnInit } from '@angular/core';
import { ProgramService } from '../../services/program.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Program } from '../../interfaces/program';
import { UserService } from '../../services/user.service';
import { Instructor } from '../../interfaces/instructor';
import { InstructorService } from '../../services/instructor.service';
import { CategoryService } from '../../services/category.service';
import { LocationService } from '../../services/location.service';
import { Location } from '../../interfaces/location';
import { Attribute } from '../../interfaces/attribute';
import { AttributeValue } from '../../interfaces/attributeValue';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Question } from '../../interfaces/question';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-open-program',
  standalone: true,
  imports: [CommonModule,RouterLink,ReactiveFormsModule],
  templateUrl: './open-program.component.html',
  styleUrl: './open-program.component.css'
})
export class OpenProgramComponent implements OnInit {

  programId:any;
  // @ts-ignore
  program:Program = null;
  currentUser:any;
  // @ts-ignore
  instructor:Instructor;
  // @ts-ignore
  location: Location;
  attributes: AttributeValue[]=[];
  programImages:any[]=[];
  questions:Question[]=[];
  sendForm:FormGroup;
  replyForm:FormGroup;
  //@ts-ignore
  p:boolean;
 
  paid=null;
  date=null;
  constructor(private programService:ProgramService,private router:Router,
              private route:ActivatedRoute,private userService:UserService,
              private instructorService:InstructorService,private categoryService:CategoryService,
              private locationService:LocationService,private snackBar:MatSnackBar,
              private builder:FormBuilder){
     this.sendForm = this.builder.group({
      content: [null, Validators.required],
    });
    this.replyForm = this.builder.group({
      content: [null, Validators.required],
    });           
    
  }
  ngOnInit(): void {
    this.programId = this.route.snapshot.paramMap.get('id');
    // @ts-ignore
    this.programService.getProgramById(this.programId).subscribe((res)=>{
      this.program = res;
      this.getInstructor();
      this.getLocation();
      this.getAttributes(this.program.id);
      this.getPictures(res.id);
      this.getQuestions(res.id);
      this.programService.getSub(this.userService.thename,res.id).subscribe((res)=>{
        //@ts-ignore
        this.paid=res.payment;
        //@ts-ignore
        this.date=res.date;
        
      });
      this.programService.checkPurchase(this.userService.thename,res.id).subscribe((res)=>{
        this.p=res;
      });

    });
    this.currentUser = this.userService.thename;
    
    
  }

  getInstructor(){
    console.log(this.program);
    this.instructorService.getInstructor(this.program.instructorId).subscribe((res)=>{
      this.instructor = res;
    });
  }
  getLocation(){
    this.locationService.getLocation(this.program.locationId).subscribe((res)=>{
      this.location = res;
    })
  }
  getAttributes(programId:any){
    this.categoryService.getAllAttributeValues(programId).subscribe((res)=>{
      this.attributes = res;
    });
  }
  deleteProgram(id:any){
    this.programService.deleteProgram(id).subscribe();
    this.snackBar.open('Program deleted.','Close',{duration:2000});
    this.router.navigate(['/']);
  }
  getPictures(id:any){
    this.programService.getProgramPictures(id).subscribe((images: any) => {
      Array.from(images).forEach((image: any) => {
        this.programService.getPictureByNameAndId(id, image).subscribe((r) => {
          this.programImages.push(URL.createObjectURL(r));
        });
      });
    });
      
  }
  getQuestions(id:any){
    this.programService.getQuestions(id).subscribe((res)=>{
      this.questions = res;
      this.questions.forEach(q=>{ this.programService.getReply(q.id).subscribe((res)=>{
        q.reply=res;
        q.show=false;
        this.userService.getAvatarByUsername(q.username).subscribe((res)=>{
          q.avatar = URL.createObjectURL(res);
        });
        this.userService.getAvatarByUsername(q.reply.username).subscribe((res)=>{
          q.reply.avatar = URL.createObjectURL(res);
        });
    
      });
    });
  
  })
  }
  onSubmit(){
    const question={
      content:this.sendForm.get('content')?.value,
      username:this.currentUser,
      programId:this.program.id,
    }
    this.programService.sendQuestion(question).subscribe();
    this.snackBar.open('Sent successfully.', 'Close', {
      duration:  2000
     });
     this.ngOnInit();
     //this.sendForm.reset();
  }
  onReply(questionId:any){
    const reply={
      content:this.replyForm.get('content')?.value,
      username: this.currentUser,
      questionId: questionId
    }
    this.programService.sendReply(reply).subscribe();
    this.snackBar.open('Sent successfully.', 'Close', {
      duration:  2000
     });
     this.ngOnInit();
     //this.replyForm.reset();
  }
  showReply(questionId:number){
    const index = this.questions.findIndex(q => q.id === questionId);
    if(index !== -1){
      this.questions[index].show = !this.questions[index].show;
    }
  }
  

  

}
