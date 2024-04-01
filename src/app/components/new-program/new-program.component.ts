import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StateService } from '../../services/state.service';
import { ProgramService } from '../../services/program.service';
import { CategoryService } from '../../services/category.service';
import { category } from '../../interfaces/category';
import { Program } from '../../interfaces/program';
import { LocationService } from '../../services/location.service';
import { InstructorService } from '../../services/instructor.service';
import { CommonModule } from '@angular/common';
import { Location } from '../../interfaces/location';
import { Attribute } from '../../interfaces/attribute';
import { AttributeValue } from '../../interfaces/attributeValue';

@Component({
  selector: 'app-new-program',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './new-program.component.html',
  styleUrl: './new-program.component.css'
})
export class NewProgramComponent {

  form: FormGroup;
  currentUser:string;
  // @ts-ignore
  categories:category[];
  // @ts-ignore
  public images: FileList | null;
  // @ts-ignore
  program:Program={}
  // @ts-ignore
  locations:Location[];
  // @ts-ignore
  instructors:Instructor[];
  // @ts-ignore
  attributes:Attribute[];

  constructor(private formBuilder: FormBuilder,
              private userService:UserService,
              private router:Router,
              private snackBar:MatSnackBar,
              private stateService:StateService,
              private programService:ProgramService,
              private categoryService:CategoryService,
              private locationService:LocationService,
              private instructorService:InstructorService) {
    this.currentUser=this.userService.thename;
    this.form = this.formBuilder.group({
      name: [null,Validators.required],
      description: [null, Validators.required],
      price: [null,Validators.required],
      level: [null, Validators.required],
      duration: [null, Validators.required],
      kontakt: [null, Validators.required],
      username: [this.currentUser],
      instructorId: [null, Validators.required],
      locationId: [null, Validators.required],
      categoryName: [null, Validators.required]
    });
    this.form.controls['username'].disable();
    this.getCategories();
    this.getInstructors();
    this.getLocations();
   }

   public handleImageChange($event: Event) {
    const inputElement = $event.target as HTMLInputElement;
    // @ts-ignore
    const fileList: FileList = inputElement.files;

    if (fileList.length > 0) {
      this.images = fileList;
    } else {
      this.images = null;
    }
  }

  public createProgram(form:FormGroup) {
    // @ts-ignore
    if (this.images === undefined) {
      this.snackBar.open("Program must have at least one picture.", undefined, {
        duration: 3000
      })
      return;
    }
    
    
    this.program.categoryName = form.value.categoryName;
    this.program.description = form.value.description;
    this.program.username = this.currentUser;
    this.program.duration = form.value.duration;
    this.program.instructorId = form.value.instructorId;
    this.program.kontakt = form.value.kontakt;
    this.program.name = form.value.name;
    this.program.level = form.value.level;
    this.program.price = form.value.price;
    this.program.locationId = form.value.locationId;

    this.programService.createProgram(this.program).subscribe((res)=>{
 
        Object.entries(form.value).slice(9).forEach(item => {
          let attrValue: AttributeValue = {programId:0, attributeName: '', value: ''};
          attrValue.value = item[1];
          attrValue.attributeName = item[0];
          attrValue.programId = res.id;
          console.log(attrValue);
          this.categoryService.addAttributeValues(attrValue).subscribe();
        });
        // @ts-ignore
        for (let i = 0; i < this.images?.length; i++) {
    
          let formData: FormData = new FormData();
          // @ts-ignore
          formData.append('image', this.images?.item(i));
          // @ts-ignore
          formData.append('programId', res.id);
          // @ts-ignore
          formData.append('cover', (i === 0) ? 1 : 0);
    
          this.programService.addProgramImages(formData).subscribe();
        }

    });
     
    this.snackBar.open("Creted successfully.", "Close", {
      duration: 3000
    });

    this.router.navigate(['/']);

  }

  getCategories(){
    this.categoryService.getAllCategories().subscribe((res)=>{
      this.categories=res;
    })
  }
  
  getLocations(){
    this.locationService.getLocations().subscribe((res)=>{
      this.locations = res;
    })
  }
  
  getInstructors(){
    this.instructorService.getAllInstructors().subscribe((res)=>{
      this.instructors = res;
    })
  }

  getAttributes(categoryName:string){
    categoryName = categoryName.substring(3);
    this.categoryService.getAllAttributes(categoryName).subscribe((res)=>{
      this.attributes = res;
      res.forEach(r => {
        this.form.addControl(r.name, new FormControl(null, Validators.required))
       })
     });
     console.log(this.attributes);
  }


}  

