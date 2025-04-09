// Clase que representa un producto
export class Product {
    _id?: string;             // ID del producto (opcional, asignado por el backend)
    name: string;             // Nombre del producto
    description: string;      // Descripción del producto
    category: string;         // Categoría del producto
    img: string;              // Nombre o URL de la imagen del producto
    rating?: number;          // Promedio de estrellas (opcional)
    people_who_rate?: number; // Cantidad de personas que han calificado el producto
    reviews?: Review[];       // Lista de reseñas asociadas al producto
  
    constructor(
      name: string = "",
      description: string = "",
      category: string = "",
      img: string = "",
      rating?: number,
      people_who_rate?: number,
      reviews?: Review[],
    ) {
      this.name = name;
      this.description = description;
      this.category = category;
      this.img = img;
      this.rating = rating;
      this.people_who_rate = people_who_rate;
      this.reviews = reviews;
    }
  }
  
  // Clase que representa una reseña de un producto
  export class Review {
    id_user: string;        // ID del usuario que hizo la reseña
    name_user: string;      // Nombre del usuario
    img_user: string;       // Imagen del usuario (URL o nombre)
    comment: string;        // Comentario escrito por el usuario
    stars: number;          // Cantidad de estrellas que dio
    createdAt?: String;     // Fecha de creación de la reseña (opcional)
  
    constructor(
      id_user: string = "",
      name_user: string = "",
      img_user: string = "",
      comment: string = "",
      stars: number = 0
    ) {
      this.id_user = id_user;
      this.name_user = name_user;
      this.img_user = img_user;
      this.comment = comment;
      this.stars = stars;
    }
  }
  