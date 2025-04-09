import { Injectable } from '@angular/core';
import { UserLogin, UserLocalStorage, User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environments';
import { Response } from '../models/response.model';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // URL de la API para login, se construye usando la variable de entorno del backend
  readonly apiUrl = environment.Backend + 'login';

  // Se inyecta HttpClient para poder hacer peticiones HTTP al backend
  constructor(private http: HttpClient) { }

  // Método que realiza la autenticación del usuario
  // Recibe un objeto con las credenciales del usuario (UserLogin)
  // Retorna un observable con la respuesta tipada que contiene los datos del usuario en localStorage
  auth(login: UserLogin) {
    return this.http.post<Response<UserLocalStorage>>(this.apiUrl + "/", login);
  }

}
