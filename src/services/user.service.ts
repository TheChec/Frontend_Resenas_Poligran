import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environments';
import { Response } from '../models/response.model';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  // URL base de la API para usuarios, construida a partir del entorno
  readonly apiUrl = environment.Backend + 'user';

  // Se inyecta HttpClient para poder hacer peticiones HTTP
  constructor(private http: HttpClient) { }

  // 🔹 Obtener todos los usuarios
  getUsers() {
    return this.http.get<Response<User[]>>(this.apiUrl + "/");
  }

  // 🔹 Obtener un usuario por ID
  getUserById(id: string) {
    return this.http.get<Response<User>>(this.apiUrl + `/${id}`);
  }

  // 🔹 Crear un nuevo usuario con posibilidad de enviar una imagen
  createUser(user: User, file?: File) {
    const formData = new FormData();

    // Se agregan los datos del usuario al FormData
    formData.append('name', user.name);
    formData.append('lastname', user.lastname);
    formData.append('age', user.age);
    formData.append('email', user.email);
    formData.append('password', user.password);
    formData.append('role', user.role);
    formData.append('img', file?.name || "");

    // Solo se adjunta el archivo si existe
    if (file) {
      formData.append('file', file);
    }

    // Se envía una petición POST con el FormData al backend
    return this.http.post<Response<User>>(this.apiUrl + "/", formData);
  }

  // 🔹 Actualizar un usuario parcialmente por su ID
  updateUser(id: string, user: Partial<User>) {
    return this.http.put<Response<User>>(this.apiUrl + `/${id}`, user);
  }

  // 🔹 Eliminar un usuario por su ID
  deleteUser(id: string) {
    return this.http.delete<Response<void>>(this.apiUrl + `/${id}`);
  }
}
