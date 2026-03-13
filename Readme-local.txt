Fases primer proyecto
Fase 1: Setup, Entorno y Arquitectura Base
Antes de tirar código de negocio, preparamos un entorno robusto y escalable.

Inicialización de Node con TypeScript (configuración estricta en tsconfig.json).

Configuración del contenedor de Docker para MongoDB.

Diseño de la estructura de directorios orientada a Clean Architecture (Domain, Application, Infrastructure, Presentation).

Configuración y validación de variables de entorno (no solo leer .env, sino tiparlas y validarlas al arrancar).

Configuración inicial del Servidor Express (como clase o módulo escalable).

Fase 2: Capa de Dominio (El Núcleo)
Aquí definimos las reglas de negocio, independientes de cualquier framework, base de datos o librería externa.

Entidades: Definición de la entidad pura de negocio (ej. UserEntity).

Manejo Personalizado de Errores: Creación de una clase CustomError para manejar errores de dominio (Bad Request, Unauthorized, Internal Server Error, etc.).

Interfaces (Contratos): Definición de las reglas que la infraestructura deberá cumplir (Interfaces AuthDatasource y AuthRepository).

Fase 3: Capa de Infraestructura y Adaptadores
Implementamos los detalles técnicos (bases de datos, encriptación, tokens) respetando los contratos del Dominio.

Base de Datos: Configuración de Mongoose, conexión a MongoDB y creación del Esquema/Modelo de usuario.

Adaptadores (Patrón Adapter): Envoltorios para librerías externas. Crearemos adaptadores genéricos para:

Encriptación: Bcrypt o Argon2 (Hashear y verificar contraseñas).

JWT: Generación y validación de JSON Web Tokens manejando firmas y genéricos en TypeScript.

Implementación de Datos: Creación de AuthDatasourceImpl (que interactúa con Mongoose) y AuthRepositoryImpl.

Mappers: Funciones para transformar los objetos crudos de MongoDB (Documentos Mongoose) a nuestras Entidades de Dominio puras.

Fase 4: Casos de Uso (Capa de Aplicación)
Aquí orquestamos el flujo de la información usando las reglas del Dominio.

Implementación de RegisterUserUseCase (Registrar usuario, encriptar clave, guardar en BD, retornar token).

Implementación de LoginUserUseCase (Verificar credenciales, generar token).

Inyección de dependencias (inyectando el Repositorio en los Casos de Uso).

Fase 5: Capa de Presentación (REST API)
La capa más externa, encargada de recibir las peticiones HTTP y devolver las respuestas.

DTOs (Data Transfer Objects): Creación de RegisterDto y LoginDto para validar la data que viene del body antes de que toque nuestra lógica.

Controladores: AuthController que recibe las peticiones, instancia los DTOs, ejecuta los Casos de Uso e inyecta las dependencias.

Middlewares:

AuthMiddleware: Para interceptar rutas protegidas, verificar el JWT y el usuario en la base de datos.

Manejo global de errores HTTP (capturando los CustomError del dominio).

Rutas: Configuración de los endpoints (/api/auth/register, /api/auth/login) y vinculación con los controladores.