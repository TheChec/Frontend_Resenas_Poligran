import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product, Review } from '../models/product.model';
import { Response } from '../models/response.model';
import { environment } from '../environments/environments';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // URL base de la API para productos, construida a partir del entorno
  readonly apiUrl = environment.Backend + 'products';

  // Se inyecta HttpClient para poder hacer peticiones HTTP
  constructor(private http: HttpClient) { }

  // Método para crear un producto, incluyendo una imagen (archivo)
  postProduct(product: Product, file: File) {
    const formData = new FormData();

    // Se agregan los campos del producto al FormData
    formData.append('name', product.name || '');
    formData.append('description', product.description || '');
    formData.append('category', product.category || '');
    formData.append('img', file?.name);
    formData.append('file', file);

    // Se envía la petición POST con el FormData al backend
    return this.http.post<Response<Product>>(this.apiUrl + '/', formData);
  }

  // Obtiene un producto por su ID
  getProduct(id: string) {
    return this.http.get<Response<Product>>(this.apiUrl + `/${id}`);
  }

  // Obtiene todos los productos
  getProducts() {
    return this.http.get<Response<Product[]>>(this.apiUrl + `/`);
  }

  // Obtiene productos filtrados por categoría
  getProductsByCategory(idcat: string) {
    return this.http.get<Response<Product[]>>(this.apiUrl + `/categoria/${idcat}`);
  }

  // Elimina un producto por su ID
  deleteProduct(id: string) {
    return this.http.delete<Response<Product>>(this.apiUrl + `/${id}`);
  }

  // Agrega una reseña a un producto específico
  putReview(id: string, review: Review) {
    return this.http.put<Response<Product>>(this.apiUrl + `/review/${id}`, review);
  }

}

