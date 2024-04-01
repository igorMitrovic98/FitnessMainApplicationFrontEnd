import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { MessageService } from '../../services/message.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../../interfaces/user';
import { Router } from '@angular/router';
import { category } from '../../interfaces/category';
import { CategoryService } from '../../services/category.service';
@Component({
  selector: 'app-sub',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './sub.component.html',
  styleUrl: './sub.component.css'
})
export class SubComponent implements OnInit {
  sendForm:FormGroup;
  categories:category[]=[];
  usersSubs:any[]=[];
  s=null;
  constructor(private formBuilder: FormBuilder,
              private categoryService:CategoryService,
              private userService:UserService,
              private snackBar:MatSnackBar,
              private router:Router) { 
   
    this.sendForm = this.formBuilder.group({
      category: [null, Validators.required],
    });
  }
  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe((res)=>{
      this.categories = res;
      this.categoryService.getUsersSubs(this.userService.thename).subscribe((r)=>{
        // @ts-ignore
        this.usersSubs=r;
        this.categories = this.categories.filter(e=> !this.usersSubs.some(userSub => userSub.categoryName === e.name));
      });
      
    });
    
  }
  onSubmit(){
  const subscript={
   categoryName: this.sendForm.get('category')?.value,
   username: this.userService.thename,
   date: new Date()
  }
  this.categoryService.subscribeUser(subscript).subscribe();
    
     this.categories = this.categories.filter(e=>{
      e.name !== subscript.categoryName
     });
     //this.usersSubs.push(subscript);
     this.ngOnInit();

  }

  unSub(cName:any){
    var cat = {name:cName}
    this.categoryService.deleteSub(this.userService.thename,cName).subscribe();
    this.ngOnInit();
  }
}
