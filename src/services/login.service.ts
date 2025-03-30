import { Injectable } from '@angular/core';
import { UserLogin, UserLocalStorage, User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environments';
import { Response } from '../models/response.model';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  readonly apiUrl = environment.Backend + 'login'

  constructor(private http: HttpClient) { }

  auth(login: UserLogin){
    return this.http.post<Response<UserLocalStorage>>(this.apiUrl + "/", login)
  }

}
