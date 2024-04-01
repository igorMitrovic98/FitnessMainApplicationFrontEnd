import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { category } from '../interfaces/category';
import { Attribute } from '../interfaces/attribute';
import { AttributeValue } from '../interfaces/attributeValue';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

  getAllCategories(){
    return this.http.get<category[]>(environment.RestApiURL+"/category");
  }

  getAllAttributes(categoryName:string){
    return this.http.get<Attribute[]>(environment.RestApiURL+`/attribute/${categoryName}`);
  }
  addAttributeValues(attrVal:any){
    return this.http.post(environment.RestApiURL+"/attributeValue",attrVal);
  }
  getAllAttributeValues(programId:any){
    return this.http.get<AttributeValue[]>(environment.RestApiURL+`/attributeValue/${programId}`);
  }
  getUsersSubs(username:any){
    return this.http.get(environment.RestApiURL+`/subscription/${username}`);
  }
  subscribeUser(data:any){
    return this.http.post(environment.RestApiURL+"/subscription",data);
  }
  deleteSub(username:any,categoryName:any){
    return this.http.delete(environment.RestApiURL+`/subscription/${username}/${categoryName}`);
  }
}

