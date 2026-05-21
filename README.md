# API CRUD - Cimientos Sustentables e Hijos

## Descripción del Proyecto

API REST desarrollada como proyecto final de la materia Desarrollo de Sistemas Web (Back End) del IFTS 29. El proyecto consiste en desarrollar un CRUD con interacciones entre módulos para gestionar los datos de la constructora hipotética "Cimientos Sustentables e Hijos".

**Docente:** Emir Eliezer Garcia Ontiveros

## Requisitos

- Node.js versión 20 o superior
- pnpm (gestor de dependencias)

El proyecto utiliza las siguientes características nativas de Node 20+:
- Flag `--watch` para modo de desarrollo con recarga automática
- Flag `--env-file` para cargar variables de entorno

## Instalación

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd <nombre-del-proyecto>
```

### 2. Instalar dependencias

Asegurarse de tener `pnpm` instalado. Si no está instalado, instalarlo globalmente:

```bash
npm install -g pnpm
```

Luego instalar las dependencias del proyecto:

```bash
pnpm install
```

## Desarrollo

Para iniciar el servidor en modo desarrollo con recarga automática:

```bash
pnpm run dev
```

El servidor se ejecutará en modo `watch` (reemplaza `nodemon`), reiniciándose automáticamente cuando detecte cambios en los archivos.

## Estructura del Proyecto

```
.
├── src/
│   ├── index.js                 (Punto de entrada de la aplicación)
│   ├── controllers/             (Controladores para cada módulo)
|   |   ├── obras.controller.js
│   │   └── ... (otros controladores)
│   └── routes/
│       ├── index.js             (Enrutador principal)
│       ├── obras.routes.js      
│       └── ... (otras rutas)    
├── request/
|   ├── obras.rest               (Ejemplos de peticiones HTTP)
│   └── ... (otros archivos de peticiones HTTP)   
├── package.json
├── pnpm-lock.yaml
└── README.md
```

- **src/**: Contiene todo el código fuente de la aplicación
- **controllers/**: Lógica de negocio para cada módulo
- **routes/**: Definición de rutas y endpoints
- **request/**: Archivo con ejemplos de peticiones HTTP para pruebas

---

## Documentación de la API de Obras (CRUD)

El módulo de Obras gestiona la persistencia de los datos correspondientes a las obras de construcción. La validación se gestiona mediante un middleware dedicado.

### Estructura de Datos (Esquema Mongoose)

| Campo | Tipo | Requerido | Descripción |
| :--- | :--- | :--- | :--- |
| `nombre` | String | Sí | Nombre representativo de la obra. |
| `direccion` | String | Sí | Dirección física (calle y número). |
| `provincia` | String | Sí | Provincia donde se ubica. |
| `director` | String | Sí | Nombre del profesional a cargo de la obra. |
| `tipo_contratacion` | String | Sí | Tipo de contrato (`licitacion`, `privada`, `inversion`). |
| `estado` | String | Sí | Estado del proyecto (`Trámites`, `Planificación`, `Construcción`, `Cierre`). |
| `presupuestoTotal` | Number | Sí | Presupuesto monetario total asignado (debe ser `>= 0`). |
| `telefono` | String | No | Teléfono de contacto asociado. |

### Endpoints del CRUD

La ruta base del módulo de Obras es `http://localhost:3001/api/obras`.

#### 1. Obtener todas las Obras
- **URL:** `/api/obras`
- **Método:** `GET`
- **Respuesta Exitosa:** `200 OK` con un array JSON de las obras.

#### 2. Obtener una Obra por ID
- **URL:** `/api/obras/:id`
- **Método:** `GET`
- **Respuesta Exitosa:** `200 OK` con el objeto de la obra.
- **Respuesta de Error:** `404 Not Found` (si no existe) o `500 Internal Server Error` (ID no válido).

#### 3. Registrar una Nueva Obra
- **URL:** `/api/obras`
- **Método:** `POST`
- **Headers:** `Content-Type: application/json`
- **Middleware de Validación:** `validarObra` (valida la presencia de campos obligatorios y tipos de datos correctos).
- **Ejemplo de Payload (JSON):**
  ```json
  {
    "nombre": "Edificio Torre Alvear",
    "direccion": "Av. Alvear 1850, Recoleta",
    "provincia": "Buenos Aires",
    "director": "Eduardo Elsztain",
    "tipo_contratacion": "privada",
    "estado": "Planificación",
    "presupuestoTotal": 50000000,
    "telefono": "11-3333-4444"
  }
  ```
- **Respuesta Exitosa:** `201 Created` con el objeto de la obra creada.
- **Respuesta de Error:** `400 Bad Request` si la validación falla (campos faltantes, presupuesto negativo, estado inválido, etc.).

#### 4. Actualizar una Obra por ID
- **URL:** `/api/obras/:id`
- **Método:** `PUT`
- **Headers:** `Content-Type: application/json`
- **Middleware de Validación:** `validarObra`
- **Respuesta Exitosa:** `200 OK` con el objeto actualizado.
- **Respuesta de Error:** `400 Bad Request` si la validación del payload falla, o `404 Not Found` si el ID no corresponde a ninguna obra.

#### 5. Eliminar una Obra por ID
- **URL:** `/api/obras/:id`
- **Método:** `DELETE`
- **Respuesta Exitosa:** `200 OK` con el mensaje de confirmación de eliminación.
- **Respuesta de Error:** `404 Not Found` si la obra no existe.

---

## Información del Grupo

**BLP Technologies**

Integrantes:
- Natalia Burnazzi
- Luciana Quilcate
- Santiago Rojas
- Leandro Rocha

**Comisión**: "D"
