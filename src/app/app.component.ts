import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserLocalStorage } from '../models/user.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

/**
 * Componente principal de la aplicación (AppComponent).
 * 
 * Funcionalidades clave:
 * --------------------------------------------------------
 * - Muestra/oculta el layout principal según la ruta (navbar, footer).
 * - Controla la lógica del menú lateral para navegación móvil.
 * - Detecta si hay un usuario autenticado guardado en localStorage.
 * - Gestiona la sesión del usuario: inicio, cierre, redirección.
 * - Muestra y cierra modales personalizados con animaciones.
 * - Alterna entre formularios para crear y eliminar productos.
 * - Usa formularios reactivos (ReactiveForms) para validación y envío.
 * - Permite a un administrador:
 *     - Crear nuevos productos (nombre, descripción, categoría, imagen).
 *     - Eliminar productos existentes seleccionados de una lista.
 * - Muestra mensajes al usuario mediante SweetAlert (Swal).
 * - Obtiene la lista de productos desde el backend al iniciar.
 */


export class AppComponent implements OnInit {

  routes: string[] = ['/inicio', '/inicio_de_sesion', '/contacto', '/quienes_somos']
  showLayout = true;
  user: UserLocalStorage = new UserLocalStorage();
  products: Product[] = []
  categorias = [
    { id: 1, nombre: 'Tecnología' },
    { id: 2, nombre: 'Cosméticos' },
    { id: 3, nombre: 'Electrodomesticos' },
    { id: 4, nombre: 'Decoraciones' }
  ];




  constructor(private router: Router,
    private productService: ProductService) {
    this.router.events.subscribe(() => {
      this.showLayout = this.router.url !== '/inicio_de_sesion';
    });
  }

  ngOnInit(): void {
    this.detectUser()
    this.getProducts()
  }
  

  toggleSidebar(): void {
    const sidebar = document.getElementById('sideBar');
    if (!sidebar) return;

    if (sidebar.classList.contains('active')) {
      sidebar.classList.remove('active');
      setTimeout(() => {
        sidebar.style.display = 'none';
      }, 300);
    } else {
      sidebar.style.display = 'flex';
      setTimeout(() => {
        sidebar.classList.add('active');
      }, 10);
    }
  }

  clickRoute(index: number) {
    this.router.navigate([this.routes[index]])
    const sidebar = document.getElementById('sideBar');
    if (!sidebar) return;
    sidebar.classList.remove('active');
    setTimeout(() => {
      sidebar.style.display = 'none';
    }, 300);
  }
  detectUser() {
    const currentUrl = this.router.url.split('?')[0];
    const userStr = localStorage.getItem('user');
  
    if (userStr) {
      this.user = JSON.parse(userStr) as UserLocalStorage;
  
      if (currentUrl === '/inicio_de_sesion') {
        this.router.navigate(['/inicio']);
      }
    } 
  }
  closeSession() {
    localStorage.removeItem('user')
    this.router.navigate(['/inicio_de_sesion']);
  }

  modalOpen(idModal: string, idBox: string) {
    const modal = document.getElementById(`${idModal}`)
    const box = document.getElementById(`${idBox}`)

    if (modal && box) {
      modal.style.display = 'flex'
      box.classList.add('animacion_modal')
    }
  }

  closeModal(idModal: string, idBox: string) {
    const modal = document.getElementById(`${idModal}`)
    const box = document.getElementById(`${idBox}`)
  
    if (modal && box) {
      box.classList.remove('animacion_modal')
      box.classList.add('ocultar_modal')
  
      setTimeout(() => {
        modal.style.display = 'none'
        box.classList.remove('ocultar_modal')
      }, 300)
    }
  }
  
  hide(showId: string, hide1: string) {
    const show = document.getElementById(`${showId}`)
    const hideElement1 = document.getElementById(`${hide1}`)

    if (show && hideElement1) {
      hideElement1.style.display = "none"
      show.style.display = "block"
    }
  }

  formAddProduct = new FormGroup({
    name: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  })

  postProduct() {
    const inputFile = document.getElementById('productImg') as HTMLInputElement;
    const formValues = this.formAddProduct.value;
  
    if (!inputFile.files || inputFile.files.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debes cargar una imagen para el producto',
      });
      return;
    }
  
    const newProduct = new Product(
      formValues.name || "",
      formValues.description || "",
      formValues.category || "",
    );
  
    this.productService.postProduct(newProduct, inputFile.files[0]).subscribe(
      res => {
        if (res) {
          Swal.fire({
            icon: 'success',
            title: '¡Muy bien!',
            text: res.message,
          });
        }
        window.location.reload();
      },
      err => {
        Swal.fire({
          icon: 'error',
          title: 'Error: ' + err.status,
          text: err.error.error,
        });
      }
    );
  }
  

  formDeleteProduct = new FormGroup({
    id: new FormControl('', [Validators.required]),
  })

  deleteProduct(){
    const formValues = this.formDeleteProduct.value

    this.productService.deleteProduct(formValues.id || "").subscribe(res => {
        if (res) {
                Swal.fire({
                  icon: 'success',
                  title: '¡Muy bien!',
                  text: res.message,
                });
              }
              window.location.reload()
    }, err => {
       Swal.fire({
                icon: 'error',
                title: 'Error: ' + err.status,
                text: err.error.error,
              });
    })
  }

  getProducts(){
    this.productService.getProducts().subscribe(res => {
      this.products = res.data as Product[] 
    }, err => {
      console.log(err.error.error)
    })
  }
}
