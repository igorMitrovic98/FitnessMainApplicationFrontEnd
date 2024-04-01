import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-activation',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './activation.component.html',
  styleUrl: './activation.component.css'
})
export class ActivationComponent {

  constructor(private snackBar:MatSnackBar,private route:ActivatedRoute,private userService:UserService) {}

  state:boolean | null =null;

  ngOnInit() {
    this.route.queryParams.subscribe((data: any) => {
      this.userService.activate({ username: data.username }).subscribe({
        next: (res: any) => {
          this.state = res;
        },
        error: () => {
          this.snackBar.open('An error occured.','Close',
            {duration:2000}
          );
        },
      });
    });
  }
}
