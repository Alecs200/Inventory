# Sistema de Gestión de Inventario

## Descripción

El Sistema de Gestión de Inventario es una aplicación web diseñada para gestionar productos y movimientos de inventario en un almacén o tienda. La aplicación permite a los usuarios agregar, editar y eliminar productos, así como registrar y visualizar movimientos de entrada y salida de inventario.

## Tecnologías Utilizadas

### Frontend
- **React:** Framework de JavaScript para construir interfaces de usuario interactivas.
- **Axios:** Librería para realizar solicitudes HTTP al backend.
- **React Router:** Librería para gestionar las rutas y la navegación entre diferentes vistas.
- **Bootstrap:** Framework CSS para estilizar y diseñar la interfaz de usuario.

### Backend
- **Node.js:** Entorno de ejecución de JavaScript para construir el servidor backend.
- **Express:** Framework para crear una API RESTful y gestionar las rutas del servidor.
- **CORS:** Middleware para permitir solicitudes entre el frontend y el backend.
- **Body-parser:** Middleware para procesar los cuerpos de las solicitudes HTTP.
- **Morgan:** Middleware para registrar solicitudes HTTP en el servidor.

## Características Principales

### Frontend
- **Inicio de Sesión:** Página de autenticación para usuarios.
- **Dashboard:** Resumen del inventario con la cantidad total de productos.
- **Gestión de Productos:** Formulario para agregar y editar productos, y una lista de productos con opciones para editar y eliminar.
- **Gestión de Movimientos:** Registro de entradas y salidas de productos, con una lista de movimientos registrados.

### Backend
- **API RESTful:** Endpoints para gestionar productos, movimientos y autenticación de usuarios.
- **Autenticación:** Endpoint para manejar el inicio de sesión de los usuarios.

## Instalación

### Requisitos Previos
- Node.js y npm deben estar instalados en tu máquina.

### Pasos para Instalar

1. **Clona el repositorio:**
    ```bash
    git clone https://github.com/tu-usuario/inventario.git
    cd inventario
    ```

2. **Instala las dependencias del backend:**
    ```bash
    cd backend
    npm install
    ```

3. **Instala las dependencias del frontend:**
    ```bash
    cd ../frontend
    npm install
    ```

4. **Inicia el servidor backend:**
    ```bash
    cd ../backend
    npm start
    ```

5. **Inicia el servidor frontend:**
    ```bash
    cd ../frontend
    npm start
    ```

6. **Accede a la aplicación:**
   - Abre tu navegador y visita `http://localhost:3000` para ver la aplicación en funcionamiento.

## Documentación de la API

### Endpoints de Productos

- **GET /api/products**
  - Obtiene la lista de todos los productos.
  - **Respuesta de ejemplo:**
    ```json
    [
      { "id": 1, "name": "Laptop HP Pavilion", "price": 1200, "quantity": 15 },
      { "id": 2, "name": "Smartphone Samsung Galaxy S21", "price": 999, "quantity": 25 }
    ]
    ```

- **POST /api/products**
  - Crea un nuevo producto.
  - **Datos de entrada:**
    ```json
    {
      "name": "Tablet Microsoft Surface Pro",
      "price": 950,
      "quantity": 20
    }
    ```
  - **Respuesta de ejemplo:**
    ```json
    {
      "id": 6,
      "name": "Tablet Microsoft Surface Pro",
      "price": 950,
      "quantity": 20
    }
    ```

- **PUT /api/products/:id**
  - Actualiza un producto existente por ID.
  - **Datos de entrada:**
    ```json
    {
      "name": "Tablet Microsoft Surface Pro",
      "price": 900,
      "quantity": 18
    }
    ```
  - **Respuesta de ejemplo:**
    ```json
    {
      "id": 6,
      "name": "Tablet Microsoft Surface Pro",
      "price": 900,
      "quantity": 18
    }
    ```

- **DELETE /api/products/:id**
  - Elimina un producto por ID.
  - **Respuesta de ejemplo:**
    ```json
    { "message": "Producto eliminado con éxito." }
    ```

### Endpoints de Movimientos

- **GET /api/movements**
  - Obtiene la lista de todos los movimientos de inventario.
  - **Respuesta de ejemplo:**
    ```json
    [
      { "id": 1, "productId": 1, "type": "entrada", "quantity": 5, "date": "2024-09-01" },
      { "id": 2, "productId": 2, "type": "salida", "quantity": 3, "date": "2024-09-02" }
    ]
    ```

- **POST /api/movements**
  - Registra un nuevo movimiento de inventario.
  - **Datos de entrada:**
    ```json
    {
      "productId": 3,
      "type": "entrada",
      "quantity": 5,
      "date": "2024-09-06"
    }
    ```
  - **Respuesta de ejemplo:**
    ```json
    {
      "id": 6,
      "productId": 3,
      "type": "entrada",
      "quantity": 5,
      "date": "2024-09-06"
    }
    ```

### Endpoint de Autenticación

- **POST /api/login**
  - Maneja el inicio de sesión del usuario.
  - **Datos de entrada:**
    ```json
    {
      "username": "admin",
      "password": "admin"
    }
    ```
  - **Respuesta de ejemplo (éxito):**
    ```json
    {
      "success": true,
      "token": "1234567890"
    }
    ```
  - **Respuesta de ejemplo (error):**
    ```json
    {
      "success": false,
      "message": "Credenciales incorrectas"
    }
    ```

## Ejemplos de Datos

### Productos Iniciales
```json
[
  { "id": 1, "name": "Laptop HP Pavilion", "price": 1200, "quantity": 15 },
  { "id": 2, "name": "Smartphone Samsung Galaxy S21", "price": 999, "quantity": 25 },
  { "id": 3, "name": "Monitor Dell 24\"", "price": 250, "quantity": 10 },
  { "id": 4, "name": "Teclado Mecánico Logitech", "price": 80, "quantity": 50 },
  { "id": 5, "name": "Ratón Inalámbrico Microsoft", "price": 30, "quantity": 100 },
  { "id": 6, "name": "Tablet Microsoft Surface Pro", "price": 950, "quantity": 20 },
  { "id": 7, "name": "Impresora Canon PIXMA", "price": 150, "quantity": 5 },
  { "id": 8, "name": "Auriculares Bose QuietComfort 35", "price": 300, "quantity": 30 },
  { "id": 9, "name": "Cámara Sony Alpha a6000", "price": 550, "quantity": 12 },
  { "id": 10, "name": "Disco Duro Externo Seagate 2TB", "price": 80, "quantity": 40 }
]
