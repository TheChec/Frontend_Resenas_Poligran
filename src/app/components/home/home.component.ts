import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ProductService } from '../../../services/product.service';
import { Product, Review } from '../../../models/product.model';
import { UserLocalStorage } from '../../../models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
/**
 * Componente de Home (HomeComponent)
 * 
 * Funcionalidades principales:
 * ----------------------------------------------------------------
 * - Carga y muestra todos los productos disponibles desde el backend.
 * - Permite filtrar productos por categoría.
 * - Muestra un modal con los detalles del producto seleccionado.
 * - Permite a los usuarios autenticados dejar una reseña (comentario + estrellas).
 * - Utiliza formularios reactivos para la recolección de reseñas.
 * - Carga los datos del usuario autenticado desde el localStorage.
 * - Usa SweetAlert2 para mostrar notificaciones de éxito o error.
 * - Incluye una utilidad para obtener el nombre de la categoría desde su ID.
 * - Controla el scroll del cuerpo cuando los modales están abiertos/cerrados.
 */

export class HomeComponent implements OnInit {

  user: UserLocalStorage = new UserLocalStorage();
  products: Product[] = [];
  selectProduct: Product = new Product();
  stars = [
    { cantidad: 1, nombre: '1 Estrella' },
    { cantidad: 2, nombre: '2 Estrella' },
    { cantidad: 3, nombre: '3 Estrella' },
    { cantidad: 4, nombre: '4 Estrella' },
    { cantidad: 5, nombre: '5 Estrella' }
  ]
  categorias = [
    { id: 1, nombre: 'Tecnología' },
    { id: 2, nombre: 'Cosméticos' },
    { id: 3, nombre: 'Electrodomesticos' },
    { id: 4, nombre: 'Decoraciones' }
  ];

  constructor(
    private productService: ProductService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.detectUser()
    this.getProducts()
  }

  detectUser() {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      this.user = JSON.parse(userStr);
    }
  }
  

  getProducts(){
    this.productService.getProducts().subscribe(res => {
      if(res) this.products = res.data as Product[]
    }, err => {
      console.log(err.error.error)
    })
  }

  toLogin() {
    this.router.navigate(['/inicio_de_sesion'])
  }

  getByCategory(idCat: string) {
    this.productService.getProductsByCategory(idCat).subscribe(res => {
      if (res) {
        Swal.fire({
          icon: 'success',
          title: '¡Muy bien!',
          text: res.message,
        });
        this.products = res.data as Product[]
      }
    }, err => {
      Swal.fire({
        icon: 'error',
        title: 'Error: ' + err.status,
        text: err.error.error,
      });
    })
  }
  modalOpen(idModal: string, idBox: string, index: number) {
    const modal = document.getElementById(idModal);
    const box = document.getElementById(idBox);
  
    if (modal && box) {
      modal.style.display = 'flex';
      box.classList.add('animacion_modal');
      document.body.classList.add('no-scroll'); // <--- evita movimiento del fondo
      this.selectProduct = this.products[index];
    }
  }
  
  closeModal(idModal: string, idBox: string) {
    const modal = document.getElementById(idModal);
    const box = document.getElementById(idBox);
  
    if (modal && box) {
      box.classList.remove('animacion_modal');
      box.classList.add('ocultar_modal');
  
      setTimeout(() => {
        modal.style.display = 'none';
        box.classList.remove('ocultar_modal');
        document.body.classList.remove('no-scroll'); // <--- vuelve a habilitar scroll
      }, 300);
    }
  }
  getNombreCategoria(categoriaId: any): string {
    const id = parseInt(categoriaId, 10); // Por si viene como string
    const categoria = this.categorias.find(c => c.id === id);
    return categoria ? categoria.nombre : 'Categoría desconocida';
  }
  


  formAddReview = new FormGroup({
    comment: new FormControl('', [Validators.required]),
    stars: new FormControl(0, [Validators.required]),
  })

  putReview(){
    const formValues = this.formAddReview.value

    let review:Review = new Review(
      this.user._id,
      this.user.name+" "+this.user.lastName,
      this.user.img || '',
      formValues.comment || '',
      formValues.stars || 0
    )

    this.productService.putReview(this.selectProduct._id || '', review).subscribe(res => {
      if(res){
        Swal.fire({
          icon: 'success',
          title: '¡Muy bien!',
          text: res.message,
        });
        window.location.reload()
      }
    }, err => {
      Swal.fire({
        icon: 'error',
        title: 'Error: ' + err.status,
        text: err.error.error,
      });
    })
  }


}
