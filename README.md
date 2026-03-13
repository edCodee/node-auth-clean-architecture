# 🛡️ Auth REST API – Clean Architecture

API RESTful robusta y escalable para la **gestión de autenticación de usuarios**, desarrollada con **Node.js, Express y MongoDB**, aplicando los principios **SOLID** y **Clean Architecture**.

El objetivo del proyecto es mantener una **arquitectura desacoplada, mantenible y testeable**, permitiendo cambiar frameworks o bases de datos sin afectar la lógica de negocio.

---

# 🚀 Características

- 🔐 **Registro de usuarios** con encriptación de contraseñas mediante **Bcrypt**
- 🔑 **Autenticación (Login)** mediante **JSON Web Tokens (JWT)**
- 🛡️ **Protección de rutas** usando middleware de autenticación
- 🧠 **Clean Architecture** con separación clara de responsabilidades
- 📚 **Documentación interactiva con Swagger**
- 🐳 **MongoDB Dockerizado** para facilitar el entorno de desarrollo
- 🧩 Código **modular, escalable y testeable**

---

# 🛠️ Tecnologías Utilizadas

| Tecnología | Descripción |
|------------|-------------|
| Node.js | Entorno de ejecución |
| TypeScript | Tipado estático |
| Express.js | Framework backend |
| MongoDB | Base de datos NoSQL |
| Mongoose | ODM para MongoDB |
| JWT | Autenticación con tokens |
| Bcrypt | Hash de contraseñas |
| Docker | Contenedores |
| Swagger | Documentación de API |

---

# 📁 Arquitectura del Proyecto

El proyecto sigue el patrón **Clean Architecture**, separando responsabilidades para mantener un código organizado y escalable.

```
src/
 ├── domain/          # Entidades, DTOs, interfaces y errores
 ├── use-cases/       # Casos de uso de negocio (Register, Login)
 ├── infrastructure/  # Implementaciones de BD, repositorios y mappers
 └── presentation/    # Controladores, middlewares, rutas y Swagger
```

Esta estructura protege la **lógica de negocio en el núcleo del sistema**.

---

# ⚙️ Instalación y Configuración

## 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/TU_USUARIO/node-auth-rest-clean-architecture.git
cd node-auth-rest-clean-architecture
```

---

## 2️⃣ Instalar dependencias

```bash
npm install
```

---

## 3️⃣ Configurar variables de entorno

Copia el archivo de plantilla:

```bash
cp .env.template .env
```

Luego configura las variables necesarias dentro de `.env`.

Ejemplo:

```
PORT=3000
MONGO_URL=mongodb://joel:supersecret@localhost:27017
MONGO_DB_NAME=mystore_db
MONGO_USER=joel
MONGO_PASS=supersecret
JWT_SEED=MiFirmaSecretaSuperSegura123
```

---

## 4️⃣ Levantar la base de datos con Docker

Asegúrate de tener **Docker** ejecutándose y luego corre:

```bash
docker compose up -d
```

---

## 5️⃣ Iniciar el servidor

Modo desarrollo:

```bash
npm run dev
```

El servidor iniciará en:

```
http://localhost:3000
```

---

# 📚 Documentación de la API

Una vez iniciado el servidor puedes acceder a la documentación interactiva de Swagger:

```
http://localhost:3000/api-docs
```

Desde ahí podrás:

- visualizar endpoints
- probar requests
- ver esquemas de datos

También puedes usar el archivo **api.http** incluido en el proyecto con la extensión **REST Client** de VS Code.

---

# 📌 Endpoints Principales

| Método | Endpoint | Descripción |
|------|------|------|
| POST | `/api/auth/register` | Registrar usuario |
| POST | `/api/auth/login` | Iniciar sesión |
| GET | `/api/auth/validate` | Validar token |

---

# 🧪 Ejemplo de Request

## Registro de usuario

```json
POST /api/auth/register

{
  "name": "Joel",
  "email": "joel@email.com",
  "password": "123456"
}
```

---

# 👨‍💻 Autor

**Edison Joel Acosta Núñez**  
Estudiante de **Ingeniería en Tecnologías de la Información**

💻 Apasionado por el desarrollo de software, arquitectura limpia y enseñanza.

---

# ⭐ Apoya el proyecto

Si este proyecto te resultó útil:

- Dale ⭐ al repositorio
- Compártelo
- Contribuye con mejoras