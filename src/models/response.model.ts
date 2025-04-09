// Clase genérica que representa una respuesta del backend
export class Response<T> {
    status: number;   // Código de estado de la respuesta (por ejemplo, 200, 404, etc.)
    message: string;  // Mensaje de la respuesta (puede ser informativo o de error)
    data: T;          // Cuerpo de la respuesta, tipado de forma genérica
  
    constructor(message: string, status: number, data: T) {
      this.status = status;     // Se asigna el código de estado
      this.message = message;   // Se asigna el mensaje
      this.data = data;         // Se asigna el dato genérico
    }
  }
  