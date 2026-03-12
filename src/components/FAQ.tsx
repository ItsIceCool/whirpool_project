import React from 'react';
import { HelpCircle, Search, ChevronDown, MessageSquare, Mail, Phone } from 'lucide-react';
import { cn } from '../types';

export const FAQ: React.FC = () => {
  const faqs = [
    {
      q: "¿Qué es GIT Labs?",
      a: "GIT Labs es el centro de innovación de Whirlpool encargado de centralizar y distribuir el conocimiento sobre Inteligencia Artificial y nuevas tecnologías a toda la organización."
    },
    {
      q: "¿Cómo puedo subir mis propios prompts a la biblioteca?",
      a: "Actualmente, la publicación está centralizada por los Administradores de Contenido. Puedes enviar tu sugerencia a través del botón 'Sugerir Nuevo Prompt' en la Biblioteca."
    },
    {
      q: "¿Puedo acceder desde mi celular personal?",
      a: "Sí, la plataforma es totalmente responsiva y compatible con dispositivos móviles a través del navegador, usando tus credenciales de Whirlpool."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in duration-500">
      <div className="text-center">
        <h2 className="text-4xl font-black text-whirlpool-blue mb-4">Centro de Ayuda</h2>
        <p className="text-slate-500 text-lg">Resuelve tus dudas sobre la plataforma y la adopción de IA en Whirlpool.</p>
        
        <div className="relative max-w-xl mx-auto mt-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="¿En qué podemos ayudarte?" 
            className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-4 shadow-sm focus:ring-2 focus:ring-whirlpool-accent transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 text-center group hover:border-whirlpool-accent transition-colors cursor-pointer">
          <div className="w-12 h-12 bg-whirlpool-light rounded-2xl flex items-center justify-center text-whirlpool-blue mx-auto mb-4 group-hover:bg-whirlpool-accent group-hover:text-white transition-colors">
            <MessageSquare size={24} />
          </div>
          <h4 className="font-bold text-slate-800">Chat en Vivo</h4>
          <p className="text-xs text-slate-500 mt-2">Habla con un experto de GIT Labs.</p>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 text-center group hover:border-whirlpool-accent transition-colors cursor-pointer">
          <div className="w-12 h-12 bg-whirlpool-light rounded-2xl flex items-center justify-center text-whirlpool-blue mx-auto mb-4 group-hover:bg-whirlpool-accent group-hover:text-white transition-colors">
            <Mail size={24} />
          </div>
          <h4 className="font-bold text-slate-800">Email Support</h4>
          <p className="text-xs text-slate-500 mt-2">Soporte técnico vía correo.</p>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 text-center group hover:border-whirlpool-accent transition-colors cursor-pointer">
          <div className="w-12 h-12 bg-whirlpool-light rounded-2xl flex items-center justify-center text-whirlpool-blue mx-auto mb-4 group-hover:bg-whirlpool-accent group-hover:text-white transition-colors">
            <Phone size={24} />
          </div>
          <h4 className="font-bold text-slate-800">Línea Directa</h4>
          <p className="text-xs text-slate-500 mt-2">Extensión 4500 (GIT Labs).</p>
        </div>
      </div>

      <div className="bg-white rounded-[40px] p-10 shadow-sm border border-slate-100">
        <h3 className="text-2xl font-bold text-slate-800 mb-8">Preguntas Frecuentes</h3>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-slate-100 rounded-2xl overflow-hidden">
              <button className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors group">
                <span className="font-bold text-slate-700 group-hover:text-whirlpool-blue transition-colors">{faq.q}</span>
                <ChevronDown size={20} className="text-slate-400" />
              </button>
              <div className="px-6 py-5 bg-slate-50 border-t border-slate-100">
                <p className="text-sm text-slate-600 leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
