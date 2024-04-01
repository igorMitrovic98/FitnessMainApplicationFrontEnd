import { Component } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private homeService:HomeService,private snackBar:MatSnackBar,
    private userService:UserService){
    this.homeService.getNews().subscribe({
      next: (data) => {
        this.news = data;
      },
      error: () => {
        this.snackBar.open(
          'An error occured.',
          'Close',
          {duration: 2000}
        );
      },
    });
    this.homeService.getExcercises().subscribe({
      next: (data) => {
        this.excercises = data;
      },
      error: () => {
        this.snackBar.open(
          'An error occured.',
          'Close',
          {duration: 2000}
        );
      },
    });
    this.userService.isLogged$.subscribe(isLogged=>{
      this.isLogged=isLogged;
    });
    this.state=false;
  }

  news: any;
  excercises:any;
  isLogged:boolean | undefined;
  state:boolean;

  changeState(){
    if(this.isLogged){
      this.state = !this.state;
    }else{
      this.snackBar.open(
        'Sign-in to see daily excersises.',
        'Close',
        {duration: 3000}
      );
    }
  }
}
