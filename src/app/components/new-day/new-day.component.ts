import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { DiaryService } from '../../services/diary.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-new-day',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './new-day.component.html',
  styleUrl: './new-day.component.css'
})
export class NewDayComponent {

  form:FormGroup;
  currentUser:any;
  diaryId:any;
  constructor(private userService:UserService,private diaryService:DiaryService,
              private snackBar:MatSnackBar,private formBuilder:FormBuilder,
              private route:ActivatedRoute,private router:Router){
    
      this.diaryId = this.route.snapshot.paramMap.get('id');
      this.currentUser=this.userService.thename;
      this.form = this.formBuilder.group({
      excersiseType: [null,Validators.required],
      duration: [null, Validators.required],
      intensity: [null,Validators.required],
      result: [null, Validators.required],
      weight: [null, Validators.required],
    });
  }

  onSubmit(form:FormGroup){
    const day = {
      excersiseType:this.form.get('excersiseType')?.value,
      duration:this.form.get('duration')?.value,
      intensity:this.form.get('intensity')?.value,
      result:this.form.get('result')?.value,
      weight:this.form.get('weight')?.value,
      diaryId:this.diaryId,
      date:new Date()
    }

    this.diaryService.createDay(day).subscribe();
    this.snackBar.open('Information added successfullty.','Close',
    {duration: 2000});
    this.router.navigate(['/diary']);

  }
}
