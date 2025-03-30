import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environments';
import { Response } from '../models/response.model';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly apiUrl = environment.Backend + 'user'

  constructor(private http: HttpClient) { }

  // 🔹 Obtener todos los usuarios
  getUsers() {
    return this.http.get<Response<User[]>>(this.apiUrl + "/");
  }

  // 🔹 Obtener un usuario por ID
  getUserById(id: string) {
    return this.http.get<Response<User>>(this.apiUrl + `/${id}`);
  }

  // 🔹 Crear un nuevo usuario
  createUser(user: User, file?: File) {
    const formData = new FormData();
  
    formData.append('name', user.name);
    formData.append('lastname', user.lastname);
    formData.append('age', user.age);
    formData.append('email', user.email);
    formData.append('password', user.password);
    formData.append('role', user.role);
    formData.append('img', file?.name || "");
  
    // Solo adjuntar la imagen si existe
    if (file) {
      formData.append('file', file);
    }
  
    return this.http.post<Response<User>>(this.apiUrl + "/", formData);
  }
  

  // 🔹 Actualizar un usuario
  updateUser(id: string, user: Partial<User>) {
    return this.http.put<Response<User>>(this.apiUrl + `/${id}`, user);
  }

  // 🔹 Eliminar un usuario
  deleteUser(id: string) {
    return this.http.delete<Response<void>>(this.apiUrl + `/${id}`);
  }
}
