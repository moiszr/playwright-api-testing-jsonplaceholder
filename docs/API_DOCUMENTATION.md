# API Seleccionado: JSONPlaceholder

## ¿Qué es JSONPlaceholder?
JSONPlaceholder es una API REST gratuita para pruebas y prototipado que proporciona datos fake JSON para simular operaciones CRUD comunes.

## ¿Por qué elegí este API?
1. **Gratuito y sin autenticación**: Ideal para pruebas educativas
2. **Endpoints variados**: Permite probar diferentes tipos de operaciones
3. **Respuestas predecibles**: Datos estructurados y consistentes
4. **Documentación clara**: Fácil de entender e implementar
5. **Ampliamente usado**: Estándar en la industria para pruebas

## Endpoints a automatizar:

### Posts (Publicaciones)
- `GET /posts` - Obtener todas las publicaciones
- `GET /posts/{id}` - Obtener una publicación específica
- `POST /posts` - Crear una nueva publicación
- `PUT /posts/{id}` - Actualizar una publicación
- `DELETE /posts/{id}` - Eliminar una publicación

### Users (Usuarios)
- `GET /users` - Obtener todos los usuarios
- `GET /users/{id}` - Obtener un usuario específico

### Comments (Comentarios)
- `GET /comments` - Obtener todos los comentarios
- `GET /posts/{id}/comments` - Obtener comentarios de una publicación

## Objetivos de automatización:
1. Validar respuestas HTTP correctas
2. Verificar estructura de datos JSON
3. Probar operaciones CRUD completas
4. Manejar casos de error apropiadamente
5. Verificar tiempos de respuesta aceptables
