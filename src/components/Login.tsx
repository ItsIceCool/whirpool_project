import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  Globe, 
  Lock,
  Mail
} from 'lucide-react';
import { UserRole } from '../types';

interface LoginProps {
  onLogin: (role: UserRole, email: string) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // <-- NUEVO: Para guardar errores

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setError(''); // Limpiamos errores previos

    try {
      // 1. Llamamos a nuestra API
      const respuesta = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo: email, password: password })
      });

      // 2. Si el servidor dice "401 Credenciales inválidas"
      if (!respuesta.ok) {
        throw new Error('Correo o contraseña incorrectos');
      }

      // 3. Si todo está bien, sacamos los datos del usuario
      const data = await respuesta.json();
      const usuarioDB = data.usuario;

      // 4. Traducimos el rol de MySQL (1, 2, 3) a tus roles de TypeScript
      let role = UserRole.USER;
      if (usuarioDB.rolId === 1) {
        role = UserRole.SUPER_ADMIN;
      } else if (usuarioDB.rolId === 2) {
        role = UserRole.CONTENT_ADMIN;
      }

      // 5. Entramos al sistema (¡Y pasamos el nombre real de la BD en lugar del correo si quieres!)
      onLogin(role, usuarioDB.nombre); 

    } catch (err) {
      // Si la contraseña es incorrecta, mostramos el mensaje
      setError('Correo o contraseña incorrectos. Intenta de nuevo.');
    }
  };

  return (
    <div className="min-h-screen bg-whirlpool-gray flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-5">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-whirlpool-blue rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-whirlpool-accent rounded-full blur-[120px]"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg bg-white rounded-[40px] shadow-2xl border border-white p-12 relative z-10"
      >
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-20 h-20 bg-whirlpool-blue rounded-3xl flex items-center justify-center text-white font-black text-4xl mb-6 shadow-xl shadow-whirlpool-blue/20">
            W
          </div>
          <h1 className="text-3xl font-black text-whirlpool-blue tracking-tight">Whirlpool AI Hub</h1>
          <p className="text-slate-500 mt-2 font-medium">Plataforma Corporativa de Aprendizaje & IA</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="email" 
                placeholder="Correo corporativo" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-whirlpool-accent focus:border-transparent transition-all outline-none"
                required
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="password" 
                placeholder="Contraseña" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-whirlpool-accent focus:border-transparent transition-all outline-none"
                required
              />
            </div>
          </div>

          {/* NUEVO: Mostrar error si las credenciales están mal */}
          {error && (
            <div className="text-red-500 text-sm font-medium text-center bg-red-50 py-2 rounded-lg">
              {error}
            </div>
          )}

          <div className="flex items-center justify-between text-xs font-bold">
            <label className="flex items-center gap-2 text-slate-500 cursor-pointer">
              <input type="checkbox" className="rounded text-whirlpool-accent focus:ring-whirlpool-accent" />
              Recordarme
            </label>
            <a href="#" className="text-whirlpool-accent hover:underline">¿Olvidaste tu contraseña?</a>
          </div>

          <button 
            type="submit"
            className="w-full btn-primary py-4 text-lg font-bold shadow-lg shadow-whirlpool-accent/20 group"
          >
            Iniciar Sesión
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-12 pt-8 border-t border-slate-50 flex items-center justify-between text-slate-400">
          <div className="flex items-center gap-2">
            <Globe size={14} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Global Support</span>
          </div>
          <p className="text-[10px] font-bold uppercase tracking-widest">© 2026 Whirlpool Corp.</p>
        </div>
      </motion.div>
    </div>
  );
};