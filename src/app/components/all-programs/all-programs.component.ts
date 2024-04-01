import { Component, ViewChild } from '@angular/core';
import { ProgramService } from '../../services/program.service';
import { UserService } from '../../services/user.service';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { category } from '../../interfaces/category';
import { CategoryService } from '../../services/category.service';
import { LocationService } from '../../services/location.service';
import { Location } from '../../interfaces/location';
import { Program } from '../../interfaces/program';
import { RouterLink } from '@angular/router';
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import { Page } from '../../interfaces/page';

import { MatPaginatorModule } from '@angular/material/paginator';
@Component({
  selector: 'app-all-programs',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,RouterLink,MatPaginatorModule],
  templateUrl: './all-programs.component.html',
  styleUrl: './all-programs.component.css'
})
export class AllProgramsComponent {
  form:FormGroup;
  // @ts-ignore
  coverPhotos:any[]=[];
  // @ts-ignore
  allPrograms:Program[]=[];
  // @ts-ignore
  categories:Category[]=[];
  // @ts-ignore
  locations:Location[]=[];
  filtered:any[]=[];
  // @ts-ignore
  page:Page;
  currentPage:number=0;
  sortBy:string = 'id';
  totalItems:number = 0;
  pageSize = 2;
  items: any[] = [];
  reset: number = 0;

  //@ts-ignore
  @ViewChild('paginator') paginator: MatPaginator;
  selectedValueC = null;
  selectedValueL = null;
  selectedValueD = null;
  constructor(private programService:ProgramService,private userService:UserService,
              private builder:FormBuilder,private categoryService:CategoryService,
              private locationService:LocationService){
   
    this.form = this.builder.group({
      search: [null, Validators.required],
      categoryName: [null, Validators.required],
      location: [null, Validators.required],
      priceFrom: [null, Validators.required],
      priceTo: [null, Validators.required],
      level: [null, Validators.required]
    });
  }
  ngOnInit(): void {
    
    this.getLocations();
    this.getCategories();
    this.getData();
   
  }

  getData(){
    this.items = [];
    this.totalItems = 0;
    this.programService.getPaginationPrograms(this.currentPage,this.pageSize,this.sortBy).subscribe((res:any)=>{
     /* this.allPrograms = res;
      this.allPrograms.forEach((program)=>{
        this.programService.getImage(program.id).subscribe((r) => {
          this.coverPhotos.push({cover: URL.createObjectURL(r), programId:program.id});
          this.filtered = this.allPrograms;
        });
      });*/
     // console.log(res);
      res.content.forEach((item:any)=>{
        console.log(item.id);
        this.programService.getProgramById(item.id).subscribe((r1)=>{
          this.programService.getImage(item.id).subscribe((r2)=>{
            this.items.push({coverImage: URL.createObjectURL(r2), program: r1});
            this.filtered = this.items;
            //console.log(this.items);
          });
        });
      });
      this.totalItems = res.totalPages;
    
    });
    
  }
  onPageChange(page: number): void {
    console.log(page);
    // this.loading = true;
    this.currentPage = page;
      this.getData();
  
  }
  
  getImage(Id:number){
    return this.items.find(p => p.program.id === Id).coverImage;
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
  public search(){
    this.filtered = this.items;
    if(this.form.value.level != null){
      this.filtered = this.filtered.filter(p=> p.program.level === this.form.value.level);
    }
    if(this.form.value.priceFrom != null){
      this.filtered = this.filtered.filter(p=> p.program.price >= this.form.value.priceFrom);
    }
    if(this.form.value.priceTo != null){
      this.filtered = this.filtered.filter(p=> p.program.price <= this.form.value.priceTo);
    }
    if(this.form.value.location != null){
      this.filtered = this.filtered.filter(p=> p.program.locationId === this.form.value.location);
    }
    if(this.form.value.categoryName != null){
      this.filtered = this.filtered.filter(p=> p.program.categoryName === this.form.value.categoryName);
    }
    if(this.form.value.search != null){
      this.filtered = this.filtered.filter(p => p.program.name.toLowerCase().includes(this.form.value.search.toLowerCase()));
    }
  }
}
