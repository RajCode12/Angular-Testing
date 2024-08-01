import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

  getAllUser() {
    return this.http.get("api/users");
  }
  getUserById(id:number) {
    return this.http.get("api/users/" + id);
  }
  updateUserById(id:number, user:any) {
    return this.http.put("api/users/" + id, user);
  }
}
