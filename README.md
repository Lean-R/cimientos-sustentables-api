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

## Información del Grupo

**BLP Technologies**

Integrantes:
- Natalia Burnazzi
- Luciana Quilcate
- Santiago Rojas
- Leandro Rocha

**Comisión**: "D"
