import express from 'express';
import cors from 'cors';
import { db } from './src/db/connection.js';

const app = express();
// Usamos el puerto 3001 para que no choque con el 3000 de tu frontend (Vite)
const PORT = 3001; 

// Configuraciones básicas
app.use(cors()); // Permite que tu frontend se conecte sin errores de seguridad
app.use(express.json()); // Permite recibir datos en formato JSON

// --- RUTAS DE NUESTRA API ---

// Ruta para obtener todos los usuarios
app.get('/api/usuarios', async (req, res) => {
  try {
    const [usuarios] = await db.query('SELECT id, nombre, correo, rolId FROM Usuario');
    // En lugar de imprimirlo en la terminal, lo enviamos como respuesta web
    res.json(usuarios); 
  } catch (error) {
    console.error('Error en la base de datos:', error);
    res.status(500).json({ error: 'Hubo un problema al buscar los usuarios' });
  }
});

// --- NUEVA RUTA DE LOGIN ---
app.post('/api/login', async (req, res) => {
  const { correo, password } = req.body; // Recibimos los datos del frontend
  
  try {
    // Buscamos si existe un usuario con ese correo y esa contraseña
    const [usuarios] = await db.query(
      'SELECT id, nombre, correo, rolId FROM Usuario WHERE correo = ? AND passwordHash = ?',
      [correo, password]
    );

    if (usuarios.length > 0) {
      // ¡Encontrado! Devolvemos los datos del usuario
      res.json({ success: true, usuario: usuarios[0] });
    } else {
      // No encontrado (correo o contraseña mal)
      res.status(401).json({ error: 'Credenciales inválidas' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});



// Encender el servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor API encendido y escuchando en http://localhost:${PORT}`);
});