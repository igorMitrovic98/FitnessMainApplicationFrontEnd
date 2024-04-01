import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProgramService } from '../../services/program.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
  currentUser:string;
  programId:any;
  s = null;
  constructor(private route:ActivatedRoute,private userService:UserService,
              private programService:ProgramService,private snackBar:MatSnackBar,private router:Router){
    this.programId = this.route.snapshot.paramMap.get('id');
    this.currentUser = this.userService.thename;
  }

  onSubmit(payment:string){
    this.programService.puschaseProgram(this.currentUser,this.programId,payment).subscribe();
    this.snackBar.open('Purchased successfully.', 'Close', {
      duration:  2000
     });
     this.router.navigate(['']);
  }

}
