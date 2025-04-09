import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { LoginService } from '../../../services/login.service';
import { UserService } from '../../../services/user.service';
import { UserLogin, UserLocalStorage, User } from '../../../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

/**
 * Componente de Login (LoginComponent)
 * 
 * Funcionalidades principales:
 * --------------------------------------------------------
 * - Ofrece formularios para el inicio de sesión y el registro de usuarios.
 * - Usa formularios reactivos (`FormGroup`, `FormControl`) con validaciones.
 * - Valida campos como email, contraseñas coincidentes y seguridad de contraseña.
 * - Valida la carga obligatoria de archivo (foto de perfil).
 * - Realiza el registro de un nuevo usuario con su imagen (mediante `UserService`).
 * - Realiza el inicio de sesión del usuario (`LoginService`) y guarda los datos en `localStorage`.
 * - Muestra mensajes al usuario mediante `SweetAlert2` (Swal).
 * - Controla visualmente el cambio entre formulario de login y formulario de registro con animaciones dinámicas.
 */


export class LoginComponent implements OnInit {

  constructor( 
    private authService: LoginService,
    private userService: UserService
  ){}

  ngOnInit(): void {
    
  }

  formRegister = new FormGroup({
    name: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    age: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    repassword: new FormControl('', [Validators.required]),
  })

  formLogin = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  signIn() {
    const formValues = this.formRegister.value;
    const regexPassword = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{5,}$/;
    const inputFile = document.getElementById('input_file') as HTMLInputElement;
    const file = inputFile?.files?.[0];

     if (!file) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debes cargar un archivo',
      });
      return;
    }
  
    if (formValues.password !== formValues.repassword) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Las contraseñas deben ser iguales',
      });
      return;
    }
  
    if (!regexPassword.test(formValues.password || "")) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'La contraseña debe tener mínimo una mayúscula, un carácter especial y un número',
      });
      return;
    }
  
    let newUser: User = new User(
      "",
      formValues.name!,
      formValues.lastName!,
      "",
      formValues.age!,
      formValues.email!,
      formValues.password!,
      "user"
    );
  
  
    this.userService.createUser(newUser, file).subscribe(
      res => {
        if (res) {
          Swal.fire({
            icon: 'success',
            title: '¡Muy bien!',
            text: res.message,
          });
        }
        window.location.reload()
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
  

  logIn(){
    const formValues = this.formLogin.value

    if(!this.formLogin.valid){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor, completa todos los campos correctamente',
      });
      return;
    }

    let userLogin: UserLogin = {
      email: formValues.email!,
      password: formValues.password!
    }

    this.authService.auth(userLogin).subscribe(res => {
      if(res){
        let userLocalStorage = res.data as UserLocalStorage
        localStorage.setItem('user',JSON.stringify(userLocalStorage))
        Swal.fire({
          icon: 'success',
          title: '¡Muy bien!',
          text: res.message,
        })
        window.location.replace('/inicio')
      }
    }, err => {
      Swal.fire({
        icon: 'error',
        title: 'Error: '+ err.status,
        text: err.error.error,
      })
      console.log(err)
    })
  }


  loginFunction(): void {
    const loginForm = document.querySelector('.login-form') as HTMLElement;
    const registerForm = document.querySelector('.register-form') as HTMLElement;
    const wrapper = document.querySelector('.wrapper') as HTMLElement;
    const loginTitle = document.querySelector('.title-login') as HTMLElement;
    const registerTitle = document.querySelector('.title-register') as HTMLElement;

    if (loginForm && registerForm && wrapper && loginTitle && registerTitle) {
      loginForm.style.left = '50%';
      loginForm.style.opacity = '1';
      registerForm.style.left = '150%';
      registerForm.style.opacity = '0';
      wrapper.style.height = '500px';
      loginTitle.style.top = '50%';
      loginTitle.style.opacity = '1';
      registerTitle.style.top = '50px';
      registerTitle.style.opacity = '0';
    }
  }

  registerFunction(): void {
    const loginForm = document.querySelector('.login-form') as HTMLElement;
    const registerForm = document.querySelector('.register-form') as HTMLElement;
    const wrapper = document.querySelector('.wrapper') as HTMLElement;
    const loginTitle = document.querySelector('.title-login') as HTMLElement;
    const registerTitle = document.querySelector('.title-register') as HTMLElement;

    if (loginForm && registerForm && wrapper && loginTitle && registerTitle) {
      loginForm.style.left = '-50%';
      loginForm.style.opacity = '0';
      registerForm.style.left = '50%';
      registerForm.style.opacity = '1';
      wrapper.style.height = '580px';
      loginTitle.style.top = '-60px';
      loginTitle.style.opacity = '0';
      registerTitle.style.top = '50%';
      registerTitle.style.opacity = '1';
    }
  }
}
