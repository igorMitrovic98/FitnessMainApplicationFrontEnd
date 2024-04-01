import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { environment } from '../../environments/environment.development';
import { Day } from '../interfaces/day';
import { Diary } from '../interfaces/diary';

@Injectable({
  providedIn: 'root'
})
export class DiaryService {

  constructor(private http:HttpClient,private userService:UserService) {

   }

   checkIfCreated(username:any){
    return this.http.get<boolean>(environment.RestApiURL+`/diary/check/${username}`);
   }
   createDiary(username:any){
    var data={
      username:username
    }
    return this.http.post(environment.RestApiURL+`/diary/${username}`,data);
   }
   getDiary(username:any){
    return this.http.get<Diary>(environment.RestApiURL+`/diary/${username}`);
   }
   getDays(diaryId:any){
    return this.http.get<Day[]>(environment.RestApiURL+`/day/${diaryId}`);
   }
   createDay(data:any){
    return this.http.post(environment.RestApiURL+"/day",data);
   }
   checkDay(diaryId:any){
    return this.http.get<boolean>(environment.RestApiURL+`/day/single/${diaryId}`)
   }
   getPDF(diaryId:any){
    return this.http.get(environment.RestApiURL+`/day/pdf/${diaryId}`,{ responseType: 'blob' });
   }
}
