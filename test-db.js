import { db } from './src/db/connection.js';

console.log("--- Consultando Usuarios desde Node.js ---");

async function obtenerUsuarios() {
  try {
    // Aquí hacemos la misma consulta que acabas de hacer en Workbench
    const [usuarios] = await db.query('SELECT id, nombre, correo, rolId FROM Usuario');
    
    console.log('✅ ¡Éxito! Encontramos', usuarios.length, 'usuarios:');
    
    // console.table imprime los datos en formato de tabla en la terminal
    console.table(usuarios); 

  } catch (error) {
    console.error('❌ Error al consultar:', error);
  } finally {
    console.log("--- Consulta finalizada ---");
    process.exit();
  }
}

obtenerUsuarios();