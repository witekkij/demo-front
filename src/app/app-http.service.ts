import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Device} from "./device.model";
import {Tester} from "./tester.model";

@Injectable({
  providedIn: 'root'
})
export class AppHttpService {

  constructor(private http: HttpClient) { }

  getDevices(){
    return this.http.get<Device[]>('http://localhost:8080/devices')
  }

  getCountries(){
    return this.http.get<String[]>('http://localhost:8080/testers/countries')
  }

  getTesters(country: string, deviceName:string){
    let params = new HttpParams().set('country', country).set('deviceName', deviceName);
    return this.http.get('http://localhost:8080/testers/match',  { params: params } )
  }

}
