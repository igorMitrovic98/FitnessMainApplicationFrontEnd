import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Location } from '../interfaces/location';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http:HttpClient) { }

  getLocations(){
    return this.http.get<Location[]>(environment.RestApiURL+"/location");
  }
  getLocation(id:any){
    return this.http.get<Location>(environment.RestApiURL+`/location/${id}`);
  }
}
