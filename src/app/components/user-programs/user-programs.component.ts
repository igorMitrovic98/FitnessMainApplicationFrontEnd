import { Component } from '@angular/core';
import { Program } from '../../interfaces/program';
import { pipe } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProgramService } from '../../services/program.service';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-user-programs',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './user-programs.component.html',
  styleUrl: './user-programs.component.css'
})
export class UserProgramsComponent {
  state:boolean;
  activeProgramsSub:Program[]=[];
  expiredProgramsSub:Program[]=[];
  activeProgramsYours:Program[]=[];
  coverPhotos:any[]=[];
  coverActive:any[]=[];
  coverExpired:any[]=[];
  subs:any[]=[];

  constructor(private programService:ProgramService,private userService:UserService){

    this.state=false;
    this.programService.getProgramsByUsername(this.userService.thename).subscribe((res)=>{
      this.activeProgramsYours = res;
      this.activeProgramsYours.forEach((program)=>{
        this.programService.getImage(program.id).subscribe((r) => {
          this.coverPhotos.push({cover: URL.createObjectURL(r), programId:program.id});
        });
      });
    });
    this.programService.getSubs(this.userService.thename).subscribe((res:any)=>{
      this.subs=res;
      this.subs.forEach((s) =>{
        this.programService.getProgramById(s.programId).subscribe((res)=>{
          if(this.isExpired(s.date,res.duration)){
            this.expiredProgramsSub.push(res);
          this.programService.getImage(res.id).subscribe((r) => {
            this.coverExpired.push({cover: URL.createObjectURL(r), programId:res.id});
          })
        }else{
          this.activeProgramsSub.push(res);
          this.programService.getImage(res.id).subscribe((r) => {
            this.coverActive.push({cover: URL.createObjectURL(r), programId:res.id});
          })
        }
      });
      });
    });
  }

  changeState(){
    this.state = !this.state;
  }
  getImage(Id:number){
    return this.coverPhotos.find(p => p.programId === Id).cover;
  }
  getImageA(Id:number){
    return this.coverActive.find(p => p.programId === Id).cover;
  }
  getImageE(Id:number){
    return this.coverExpired.find(p => p.programId === Id).cover;
  }

  isExpired(expiry:any,duration:any){
    const exp = new Date(expiry);
    exp.setDate(exp.getDate() + duration);
    const today = new Date();
    return exp < today;
  }
}
