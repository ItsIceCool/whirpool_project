import React from 'react';
import { 
  ArrowLeft, 
  PlayCircle, 
  FileText, 
  Video, 
  ExternalLink, 
  Table, 
  Presentation,
  CheckCircle2,
  Clock,
  BookOpen,
  MessageSquare
} from 'lucide-react';
import { Course, Resource } from '../types';
import { motion } from 'motion/react';

interface CourseDetailProps {
  course: Course;
  onBack: () => void;
}

const ResourceIcon = ({ type }: { type: Resource['type'] }) => {
  switch (type) {
    case 'pdf': return <FileText size={20} className="text-red-500" />;
    case 'video': return <Video size={20} className="text-blue-500" />;
    case 'sheet': return <Table size={20} className="text-emerald-500" />;
    case 'slide': return <Presentation size={20} className="text-amber-500" />;
    default: return <ExternalLink size={20} className="text-slate-400" />;
  }
};

export const CourseDetail: React.FC<CourseDetailProps> = ({ course, onBack }) => {
  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-500 hover:text-whirlpool-blue transition-colors font-bold text-sm"
      >
        <ArrowLeft size={18} />
        Volver al catálogo
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100">
            <div className="relative h-72">
              <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
                <div className="flex gap-2 mb-4">
                  <span className="bg-whirlpool-accent text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                    {course.area}
                  </span>
                  <span className="bg-white/20 backdrop-blur text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                    {course.level}
                  </span>
                </div>
                <h2 className="text-3xl font-black text-white">{course.title}</h2>
              </div>
            </div>
            
            <div className="p-8">
              <div className="flex flex-wrap gap-8 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                    <Clock size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Duración</p>
                    <p className="text-sm font-bold text-slate-700">{course.duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                    <BookOpen size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Recursos</p>
                    <p className="text-sm font-bold text-slate-700">{course.resources.length} Archivos</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                    <CheckCircle2 size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Certificación</p>
                    <p className="text-sm font-bold text-slate-700">GIT Labs Verified</p>
                  </div>
                </div>
              </div>

              <h4 className="text-lg font-bold text-slate-800 mb-4">Descripción del Curso</h4>
              <p className="text-slate-600 leading-relaxed mb-8">
                {course.description}
                <br /><br />
                Este módulo ha sido diseñado específicamente para empleados de Whirlpool, integrando casos de uso reales de nuestras plantas de manufactura y centros de diseño. Al finalizar, serás capaz de aplicar herramientas de IA Generativa para optimizar procesos críticos en tu área.
              </p>

              <div className="space-y-4">
                <h4 className="text-lg font-bold text-slate-800 mb-4">Recursos de Aprendizaje</h4>
                {course.resources.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {course.resources.map((res) => (
                      <div key={res.id} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-whirlpool-light hover:border-whirlpool-accent transition-all cursor-pointer group">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                            <ResourceIcon type={res.type} />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-700 group-hover:text-whirlpool-blue transition-colors">{res.title}</p>
                            <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">{res.type} {res.size ? `• ${res.size}` : ''}</p>
                          </div>
                        </div>
                        <ExternalLink size={16} className="text-slate-300 group-hover:text-whirlpool-accent" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                    <p className="text-slate-400 text-sm">No hay recursos adicionales para este curso aún.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-whirlpool-blue p-8 rounded-3xl text-white shadow-xl shadow-whirlpool-blue/20">
            <h4 className="text-xl font-bold mb-4">Tu Progreso</h4>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-whirlpool-accent uppercase tracking-widest">Completado</span>
              <span className="text-xl font-black">{course.status === 'completed' ? '100%' : course.status === 'in-progress' ? '45%' : '0%'}</span>
            </div>
            <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden mb-8">
              <div 
                className="bg-whirlpool-accent h-full rounded-full" 
                style={{ width: course.status === 'completed' ? '100%' : course.status === 'in-progress' ? '45%' : '0%' }}
              ></div>
            </div>
            
            <div className="space-y-3">
              <button className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2">
                <PlayCircle size={20} />
                Ver Lección
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <h4 className="font-bold text-slate-800 mb-4">Ayuda Contextual</h4>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-whirlpool-light flex items-center justify-center text-whirlpool-blue flex-shrink-0">
                  <MessageSquare size={16} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-700">Preguntar al Asistente</p>
                  <p className="text-[10px] text-slate-500">Resuelve dudas sobre este curso instantáneamente.</p>
                </div>
              </div>
              <button className="w-full text-xs font-bold text-whirlpool-accent bg-whirlpool-light py-2 rounded-lg hover:bg-whirlpool-accent hover:text-white transition-all">
                Abrir Chatbot
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
