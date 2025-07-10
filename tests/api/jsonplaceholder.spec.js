// tests/api/jsonplaceholder.spec.js
const { test, expect } = require('@playwright/test');

// Configuración global
const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

test.describe('JSONPlaceholder API Tests', () => {
  
  test.describe('Posts Endpoints', () => {
    
    test('GET /posts - Obtener todas las publicaciones', async ({ request }) => {
      const response = await request.get(`${API_BASE_URL}/posts`);
      
      // Validar código de estado
      expect(response.status()).toBe(200);
      
      // Validar headers
      expect(response.headers()['content-type']).toContain('application/json');
      
      // Validar cuerpo de respuesta
      const posts = await response.json();
      expect(Array.isArray(posts)).toBeTruthy();
      expect(posts.length).toBe(100);
      
      // Validar estructura del primer post
      const firstPost = posts[0];
      expect(firstPost).toHaveProperty('userId');
      expect(firstPost).toHaveProperty('id');
      expect(firstPost).toHaveProperty('title');
      expect(firstPost).toHaveProperty('body');
      
      // Validar tipos de datos
      expect(typeof firstPost.userId).toBe('number');
      expect(typeof firstPost.id).toBe('number');
      expect(typeof firstPost.title).toBe('string');
      expect(typeof firstPost.body).toBe('string');
      
      console.log(`✅ Se obtuvieron exitosamente ${posts.length} publicaciones`);
    });

    test('GET /posts/{id} - Obtener una publicación específica', async ({ request }) => {
      const postId = 1;
      const response = await request.get(`${API_BASE_URL}/posts/${postId}`);
      
      expect(response.status()).toBe(200);
      
      const post = await response.json();
      expect(post.id).toBe(postId);
      expect(post.userId).toBe(1);
      expect(post.title).toBeTruthy();
      expect(post.body).toBeTruthy();
      
      console.log(`✅ Se obtuvo exitosamente la publicación con ID: ${postId}`);
    });

    test('POST /posts - Crear una nueva publicación', async ({ request }) => {
      const newPost = {
        title: 'Mi nuevo post de prueba',
        body: 'Este es el contenido del post creado en Playwright',
        userId: 1
      };
      
      const response = await request.post(`${API_BASE_URL}/posts`, {
        data: newPost
      });
      
      expect(response.status()).toBe(201);
      
      const createdPost = await response.json();
      expect(createdPost.title).toBe(newPost.title);
      expect(createdPost.body).toBe(newPost.body);
      expect(createdPost.userId).toBe(newPost.userId);
      expect(createdPost.id).toBe(101); // JSONPlaceholder asigna ID 101
      
      console.log(`✅ Se creó exitosamente la publicación con ID: ${createdPost.id}`);
    });

    test('PUT /posts/{id} - Actualizar una publicación', async ({ request }) => {
      const postId = 1;
      const updatedPost = {
        id: postId,
        title: 'Título actualizado',
        body: 'Contenido actualizado con Playwright',
        userId: 1
      };
      
      const response = await request.put(`${API_BASE_URL}/posts/${postId}`, {
        data: updatedPost
      });
      
      expect(response.status()).toBe(200);
      
      const result = await response.json();
      expect(result.title).toBe(updatedPost.title);
      expect(result.body).toBe(updatedPost.body);
      expect(result.id).toBe(postId);
      
      console.log(`✅ Se actualizó exitosamente la publicación con ID: ${postId}`);
    });

    test('DELETE /posts/{id} - Eliminar una publicación', async ({ request }) => {
      const postId = 1;
      const response = await request.delete(`${API_BASE_URL}/posts/${postId}`);
      
      expect(response.status()).toBe(200);
      
      console.log(`✅ Se eliminó exitosamente la publicación con ID: ${postId}`);
    });
  });

  test.describe('Users Endpoints', () => {
    
    test('GET /users - Obtener todos los usuarios', async ({ request }) => {
      const response = await request.get(`${API_BASE_URL}/users`);
      
      expect(response.status()).toBe(200);
      
      const users = await response.json();
      expect(Array.isArray(users)).toBeTruthy();
      expect(users.length).toBe(10);
      
      // Validar estructura del primer usuario
      const firstUser = users[0];
      expect(firstUser).toHaveProperty('id');
      expect(firstUser).toHaveProperty('name');
      expect(firstUser).toHaveProperty('username');
      expect(firstUser).toHaveProperty('email');
      expect(firstUser).toHaveProperty('address');
      expect(firstUser).toHaveProperty('phone');
      expect(firstUser).toHaveProperty('website');
      expect(firstUser).toHaveProperty('company');
      
      console.log(`✅ Se obtuvieron exitosamente ${users.length} usuarios`);
    });

    test('GET /users/{id} - Obtener un usuario específico', async ({ request }) => {
      const userId = 1;
      const response = await request.get(`${API_BASE_URL}/users/${userId}`);
      
      expect(response.status()).toBe(200);
      
      const user = await response.json();
      expect(user.id).toBe(userId);
      expect(user.name).toBeTruthy();
      expect(user.email).toContain('@');
      
      console.log(`✅ Se obtuvo exitosamente el usuario: ${user.name}`);
    });
  });

  test.describe('Comments Endpoints', () => {
    
    test('GET /comments - Obtener todos los comentarios', async ({ request }) => {
      const response = await request.get(`${API_BASE_URL}/comments`);
      
      expect(response.status()).toBe(200);
      
      const comments = await response.json();
      expect(Array.isArray(comments)).toBeTruthy();
      expect(comments.length).toBe(500);
      
      // Validar estructura del primer comentario
      const firstComment = comments[0];
      expect(firstComment).toHaveProperty('postId');
      expect(firstComment).toHaveProperty('id');
      expect(firstComment).toHaveProperty('name');
      expect(firstComment).toHaveProperty('email');
      expect(firstComment).toHaveProperty('body');
      
      console.log(`✅ Se obtuvieron exitosamente ${comments.length} comentarios`);
    });

    test('GET /posts/{id}/comments - Obtener comentarios de una publicación', async ({ request }) => {
      const postId = 1;
      const response = await request.get(`${API_BASE_URL}/posts/${postId}/comments`);
      
      expect(response.status()).toBe(200);
      
      const comments = await response.json();
      expect(Array.isArray(comments)).toBeTruthy();
      expect(comments.length).toBe(5);
      
      // Verificar que todos los comentarios pertenecen al post
      comments.forEach(comment => {
        expect(comment.postId).toBe(postId);
      });
      
      console.log(`✅ Se obtuvieron exitosamente ${comments.length} comentarios para la publicación ${postId}`);
    });
  });

  test.describe('Error Handling', () => {
    
    test('GET /posts/{id} - Manejar ID inexistente', async ({ request }) => {
      const invalidId = 999;
      const response = await request.get(`${API_BASE_URL}/posts/${invalidId}`);
      
      expect(response.status()).toBe(404);
      
      console.log(`✅ Se manejó exitosamente el error 404 para ID de publicación inválido: ${invalidId}`);
    });

    test('GET /users/{id} - Manejar ID inexistente', async ({ request }) => {
      const invalidId = 999;
      const response = await request.get(`${API_BASE_URL}/users/${invalidId}`);
      
      expect(response.status()).toBe(404);
      
      console.log(`✅ Se manejó exitosamente el error 404 para ID de usuario inválido: ${invalidId}`);
    });
  });

  test.describe('Performance Tests', () => {
    
    test('Validar tiempo de respuesta de endpoints principales', async ({ request }) => {
      const endpoints = [
        '/posts',
        '/users',
        '/comments'
      ];
      
      for (const endpoint of endpoints) {
        const startTime = Date.now();
        const response = await request.get(`${API_BASE_URL}${endpoint}`);
        const endTime = Date.now();
        const responseTime = endTime - startTime;
        
        expect(response.status()).toBe(200);
        expect(responseTime).toBeLessThan(5000); // Menos de 5 segundos
        
        console.log(`✅ ${endpoint} respondió en ${responseTime}ms`);
      }
    });
  });

  test.describe('Data Validation', () => {
    
    test('Validar integridad de datos entre posts y users', async ({ request }) => {
      // Obtener posts y users
      const [postsResponse, usersResponse] = await Promise.all([
        request.get(`${API_BASE_URL}/posts`),
        request.get(`${API_BASE_URL}/users`)
      ]);
      
      const posts = await postsResponse.json();
      const users = await usersResponse.json();
      
      // Crear un set de IDs de usuarios válidos
      const validUserIds = new Set(users.map(user => user.id));
      
      // Verificar que todos los posts tienen userIds válidos
      posts.forEach(post => {
        expect(validUserIds.has(post.userId)).toBeTruthy();
      });
      
      console.log('✅ Todas las publicaciones tienen IDs de usuario válidos');
    });
  });
});