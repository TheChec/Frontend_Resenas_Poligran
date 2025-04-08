export class User {
    id?: string;
    name: string;
    lastname: string;
    img: string;
    age: string;
    email: string;
    password: string;
    role: string;
  
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

export type UserLogin = Pick<User, 'email' | 'password'>;

export class UserLocalStorage {
  _id: string;
  name: string;
  lastName: string;
  role: string;
  img: string

  constructor(_id: string = "",
    name: string = "",
    lastName: string = "",
    role: string = "",
    img: string = ""

  ){
    this._id = _id
    this.name = name
    this.lastName = lastName
    this.role = role
    this.img = img
  }

}