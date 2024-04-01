import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor(private http:HttpClient, private router:Router, private snackBar:MatSnackBar) { }
  
  private isLoggedSubject = new BehaviorSubject<boolean>(false);
  isLogged$ = this.isLoggedSubject.asObservable();
  // @ts-ignore
  thename:string;

  setTheName(value:string){
    this.thename=value;
  }

  setIsLogged(value:boolean){
    this.isLoggedSubject.next(value);
  }

  public register(form: FormGroup): any {
    console.log(form.value)
    return this.http.post(environment.RestApiURL + "/user/register", form.value, {
      headers: environment.headerOption
    }).pipe(
      catchError(
        (e: any) => {
          if (e.status === 403)
            this.snackBar.open("Username or email already taken.", undefined, {
              duration: 3000
            });
          return throwError(e);
        }
    ));
  }

  activate(data:any){
    console.log(data);
    return this.http.put(environment.RestApiURL+"/user/activate",data);
  }
  nonactive(data:any){
    return this.http.put(environment.RestApiURL+"/user/nonactive",data).pipe(
      tap((res: any) => {
            this.router.navigate(['']);
            this.snackBar.open('Check your email for the activation link.', 'Close', {
             duration:  2000
            });
      }),
      catchError((error: any) => {
        this.snackBar.open('Invalid credentials.', 'Close', {
          duration: 2000 
        });
        return throwError(()=>error);
      })
    );
  }

  loginUser(user:any){
    console.log(user);
    return this.http.post(environment.RestApiURL + "/user/login", user).pipe(
      tap((res: any) => {
            this.setIsLogged(true);
            this.setTheName(user.username);
            this.router.navigate(['']);
            this.snackBar.open('Signed-in successfully.', 'Close', {
             duration:  2000
            });
      }),
      catchError((error: any) => {
        if(error.status === 403){
        this.snackBar.open('You need to active your account.', 'Close', {
          duration: 2000 
        });
        this.router.navigate(['/notactive']);
      }else if(error.status === 404){
        this.snackBar.open('Invalid credentials.', 'Close', {
          duration: 2000 
        });
      }
        return throwError(()=>error);
      })
    );
  }

  uploadAvatar(data:any){
    return this.http.post(environment.RestApiURL + "/avatars", data);
  }

  uploadDefault(username:any){
    return this.http.post(environment.RestApiURL + `/avatars/${username}`, null, {headers: environment.headerOption});
  }
  getAvatarByUsername(username:string | undefined){
    return this.http.get(environment.RestApiURL + `/avatars/${username}`, {responseType: 'blob'});
  }
  getUserByUsername(username:string | undefined){
    return this.http.get(environment.RestApiURL + `/user/${username}`);
  }
  updateUser(username:any,data:any){
    return this.http.put(environment.RestApiURL + `/user/${username}`,data);
  }
  updateAvatar(data:any){
    return this.http.put(environment.RestApiURL + "/avatars", data);
  }
  getAllUsers(){
    return this.http.get(environment.RestApiURL+"/user/all");
  }
}