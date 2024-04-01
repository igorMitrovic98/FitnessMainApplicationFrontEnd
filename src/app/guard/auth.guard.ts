import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { UserService } from '../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export const authGuard: CanActivateFn = (route, state) => {
  var service = inject(UserService);
  var snackbar = inject(MatSnackBar);
  if(service.thename == null){
    snackbar.open('You need to sign-in first','Close',
    {duration: 2000});
    return false;
  }
  return true;
};
