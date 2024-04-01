import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { environment } from '../../environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class HomeService {
  constructor(private http:HttpClient){

  }
  getNews():Observable<any>{
    return this.http.get(environment.RestApiURL+"/news");
  }
  getExcercises():Observable<any>{
    return this.http.get("https://api.api-ninjas.com/v1/exercises", { headers: { 'X-Api-Key': environment.ApiKey } });
  }
}
