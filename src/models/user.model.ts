// Clase que representa un usuario completo
export class User {
  id?: string;             // ID opcional del usuario
  name: string;            // Nombre del usuario
  lastname: string;        // Apellido del usuario
  img: string;             // URL o nombre del archivo de imagen del usuario
  age: string;             // Edad del usuario
  email: string;           // Correo electrónico
  password: string;        // Contraseña
  role: string;            // Rol del usuario (por defecto 'user')

  constructor(
    id?: string,
    name: string = '',
    lastname: string = '',
    img: string = "",
    age: string = '',
    email: string = '',
    password: string = '',
    role: string = 'user'
  ) {
    this.id = id;
    this.name = name;
    this.lastname = lastname;
    this.img = img;
    this.age = age;
    this.email = email;
    this.password = password;
    this.role = role;
  }
}

// Tipo que representa solo los campos necesarios para el login
export type UserLogin = Pick<User, 'email' | 'password'>;

// Clase que representa los datos del usuario que se guardan en el localStorage tras iniciar sesión
export class UserLocalStorage {
  _id: string;       // ID del usuario
  name: string;      // Nombre del usuario
  lastName: string;  // Apellido del usuario
  role: string;      // Rol del usuario
  img: string;       // Imagen del usuario

  constructor(
    _id: string = "",
    name: string = "",
    lastName: string = "",
    role: string = "",
    img: string = ""
  ) {
    this._id = _id;
    this.name = name;
    this.lastName = lastName;
    this.role = role;
    this.img = img;
  }
}
