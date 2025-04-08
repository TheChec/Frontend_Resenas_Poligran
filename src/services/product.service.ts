import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product, Review } from '../models/product.model';
import { Response } from '../models/response.model';
import { environment } from '../environments/environments';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  readonly apiUrl = environment.Backend + 'products'

  constructor(private http: HttpClient) { }

  postProduct(product: Product, file: File) {
    const formData = new FormData();
  
    formData.append('name', product.name || '');
    formData.append('description', product.description || '');
    formData.append('category', product.category || '');
    formData.append('img', file?.name);
    formData.append('file', file);
  
    return this.http.post<Response<Product>>(this.apiUrl + '/', formData);
  }
  
  getProduct(id: string){
    return this.http.get<Response<Product>>(this.apiUrl + `/${id}`)
  }

  getProducts(){
    return this.http.get<Response<Product[]>>(this.apiUrl + `/`)
  }

  getProductsByCategory(idcat: string){
    return this.http.get<Response<Product[]>>(this.apiUrl + `/categoria/${idcat}`)
  }

  deleteProduct(id: string){
    return this.http.delete<Response<Product>>(this.apiUrl + `/${id}`)
  }

  putReview(id: string, review: Review){
    return this.http.put<Response<Product>>(this.apiUrl + `/review/${id}`, review)
  }


}




