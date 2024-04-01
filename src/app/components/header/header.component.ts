import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private userService:UserService,private router:Router){
    this.userService.isLogged$.subscribe(isLogged =>
      {this.state=isLogged;});
  }
  state:boolean | undefined;
  avatar:any;
  
  
  
  logout(){
    this.userService.setIsLogged(false);
    this.router.navigateByUrl('/');
  }
}
