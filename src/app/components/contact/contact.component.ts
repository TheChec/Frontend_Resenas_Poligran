import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})

/**
 * Componente de Contacto (ContactComponent)
 * 
 * Funcionalidades de la plantilla (HTML):
 * ----------------------------------------------------------------
 * - Presenta una sección de contacto dividida en dos columnas principales:
 * 
 *   1. **Formulario de contacto**:
 *      - Permite al usuario ingresar su nombre, correo electrónico, asunto y mensaje.
 *      - La estructura está lista para vincularse con un formulario reactivo usando `formControlName`.
 *      - El botón "Enviar correo" está preparado para activar una función de envío.
 *      - Ideal para conectar con una función que use un servicio (como Nodemailer desde backend).
 * 
 *   2. **Mapa de ubicación**:
 *      - Muestra un iframe con Google Maps apuntando al Campus Medellín del Politécnico Grancolombiano.
 * 
 *   3. **Información de contacto**:
 *      - Muestra dirección física, teléfono de atención y correo de contacto.
 *      - Íconos decorativos de ubicación, teléfono y correo usando Font Awesome.
 * 

 */

export class ContactComponent {

}
