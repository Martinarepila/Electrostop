# ElectroStop - Proyecto Final E-commerce

## Descripción del proyecto

ElectroStop es un sitio web de comercio electrónico dedicado a la venta de productos tecnológicos. El proyecto fue desarrollado como entrega final del curso, integrando conocimientos de HTML, CSS y JavaScript para crear una página dinámica, interactiva y responsive.

La página permite visualizar productos obtenidos desde una API REST, agregarlos a un carrito de compras, modificar cantidades, eliminar productos y mantener la información guardada mediante localStorage.

## Tecnologías utilizadas

* HTML5
* CSS3
* JavaScript
* Bootstrap 5
* Flexbox
* Google Fonts
* API REST
* LocalStorage

## Funcionalidades principales

### Productos

* Los productos se cargan dinámicamente utilizando una API REST mediante Fetch.
* Cada producto muestra:

  * Imagen
  * Nombre
  * Descripción
  * Precio
  * Botón para agregar al carrito

### Carrito de compras

El sitio cuenta con un carrito dinámico que permite:

* Agregar productos.
* Visualizar productos seleccionados.
* Aumentar o disminuir cantidades.
* Eliminar productos.
* Calcular el total automáticamente.
* Guardar los productos mediante localStorage para mantener el carrito aunque se cierre la página.

### Formulario de contacto

Se implementó un formulario funcional utilizando Formspree.

Incluye validación mediante JavaScript para controlar:

* Nombre obligatorio.
* Formato correcto del correo electrónico.
* Mensaje requerido.

## Diseño y accesibilidad

El proyecto incluye:

* Estructura HTML semántica utilizando:

  * Header
  * Nav
  * Main
  * Section
  * Footer

* Diseño responsive adaptado a diferentes dispositivos.

* Uso de Flexbox para la sección de productos.

* Uso de Grid para organizar contenido.

* Etiquetas alt en imágenes para mejorar la accesibilidad.

* Metaetiquetas SEO para mejorar la optimización del sitio.

## Estructura del proyecto

```
ElectroStop/

│── index.html
│── styles.css
│── script.js
│── README.md
```

## API utilizada

Los productos son obtenidos mediante una API REST utilizando Fetch API.

La información obtenida se renderiza dinámicamente en el DOM para mostrar los productos disponibles.

## Publicación

El proyecto puede visualizarse mediante un hosting gratuito como:

* Netlify
* GitHub Pages

## Autor

Martina Repila Martin

Proyecto Final - E-commerce
