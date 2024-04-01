import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Instructor } from '../interfaces/instructor';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class InstructorService {

  constructor(private http:HttpClient) { }

  getAllInstructors(){
    return this.http.get<Instructor[]>(environment.RestApiURL+"/instructor");
  }
  getInstructor(id:any){
    return this.http.get<Instructor>(environment.RestApiURL+`/instructor/${id}`);
  }
}
