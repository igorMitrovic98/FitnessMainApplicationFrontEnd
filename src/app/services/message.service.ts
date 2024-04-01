import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http:HttpClient) { }

  support(message:any){
    return this.http.post(environment.RestApiURL + "/message", message);
  }
  getUsers(username:any){
    return this.http.get(environment.RestApiURL+`/message/${username}`);
  }
  updateSeen(username1:any,username2:any){
    return this.http.put(environment.RestApiURL+`/message/${username1}/${username2}`,1);
  }
}
