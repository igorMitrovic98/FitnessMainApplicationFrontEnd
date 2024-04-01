import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Program } from '../interfaces/program';
import { Question } from '../interfaces/question';
import { Reply } from '../interfaces/reply';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {

  constructor(private http:HttpClient) { }

  createProgram(data:any){
    return this.http.post<Program>(environment.RestApiURL + "/program", data);
  }
  public addProgramImages(formData: FormData) {
    return this.http.post(environment.RestApiURL + "/picture", formData);
  }
  getProgramsByUsername(username:string){
    return this.http.get<Program[]>(environment.RestApiURL+`/program/${username}`);
  }
  getImage(programId:number){
    return this.http.get(environment.RestApiURL+`/picture/${programId}`,{ responseType: 'blob' });
  }
  getAllPrograms(){
    return this.http.get<Program[]>(environment.RestApiURL+"/program");
  }
  getProgramById(programId:any){
    return this.http.get<Program>(environment.RestApiURL+`/program/display/${programId}`);
  }
  deleteProgram(id:any){
    return this.http.delete(environment.RestApiURL+`/program/${id}`);
  }
  getProgramPictures(id:any){
    return this.http.get(environment.RestApiURL+`/picture/all/${id}`);
  }
  getPictureByNameAndId(id:any,name:any){
    return this.http.get(environment.RestApiURL+`/picture/${id}/${name}`,{responseType: 'blob'});
  }
  getQuestions(id:any){
    return this.http.get<Question[]>(environment.RestApiURL+`/question/all/${id}`);
  }
  getReply(id:any){
    return this.http.get<Reply>(environment.RestApiURL+`/reply/${id}`);
  }
  sendQuestion(question:any){
    return this.http.post(environment.RestApiURL+"/question",question);
  }
  sendReply(reply:any){
    return this.http.post(environment.RestApiURL+"/reply",reply);
  }
  checkPurchase(username:any,programid:any){
    return this.http.get<boolean>(environment.RestApiURL+`/usersPrograms/${username}/${programid}`);
  }
  puschaseProgram(username:any,programId:any,payment:string){
    return this.http.post(environment.RestApiURL+`/usersPrograms/${username}/${programId}`,payment);
  }
  getSubs(username:any){
    return this.http.get(environment.RestApiURL+`/usersPrograms/get/${username}`);
  }
  getSub(username:any,programid:any){
    return this.http.get(environment.RestApiURL+`/usersPrograms/one/${username}/${programid}`);
  }
  getPaginationPrograms(page:number,size:number,sort:string){
    console.log(page);
    console.log(size);
    return this.http.get(environment.RestApiURL+`/program/paginator/${page}/${size}`);
  }

}
