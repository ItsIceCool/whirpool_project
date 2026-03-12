import React from 'react';
import { motion } from 'motion/react';
import { 
  BookOpen, 
  Clock, 
  TrendingUp, 
  ChevronRight, 
  MessageSquare,
  Star
} from 'lucide-react';
import { User, Course, PromptGem } from '../types';
import { MOCK_COURSES, MOCK_PROMPTS } from '../mockData';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DashboardProps {
  user: User;
  onNavigate: (page: string) => void;
}

const data = [
  { name: 'Sem 1', horas: 2 },
  { name: 'Sem 2', horas: 5 },
  { name: 'Sem 3', horas: 8 },
  { name: 'Sem 4', horas: 12 },
];

export const Dashboard: React.FC<DashboardProps> = ({ user, onNavigate }) => {
  const pendingCourses = MOCK_COURSES.filter(c => c.status !== 'completed');
  const recommendedPrompts = MOCK_PROMPTS.filter(p => p.area === user.area || p.area === 'Dirección');

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-whirlpool-blue">¡Hola, {user.name.split(' ')[0]}! 👋</h2>
          <p className="text-slate-500 mt-1">Bienvenido a tu centro de aprendizaje de IA. Tienes {pendingCourses.length} cursos pendientes.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => onNavigate('chatbot')} className="btn-secondary">
            <MessageSquare size={20} />
            Asistente IA
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-50 text-blue-500 rounded-xl">
              <BookOpen size={24} />
            </div>
            <span className="text-xs font-bold text-blue-500 bg-blue-50 px-2 py-1 rounded-full">{user.progress}%</span>
          </div>
          <p className="text-slate-400 text-sm font-medium">Progreso General</p>
          <div className="w-full bg-slate-100 h-2 rounded-full mt-3 overflow-hidden">
            <div className="bg-whirlpool-accent h-full rounded-full" style={{ width: `${user.progress}%` }}></div>
          </div>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-50 text-purple-500 rounded-xl">
              <Clock size={24} />
            </div>
          </div>
          <p className="text-slate-400 text-sm font-medium">Cursos Completados</p>
          <h3 className="text-2xl font-bold text-slate-800 mt-1">{user.completedCourses} / {MOCK_COURSES.length}</h3>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-emerald-50 text-emerald-500 rounded-xl">
              <TrendingUp size={24} />
            </div>
          </div>
          <p className="text-slate-400 text-sm font-medium">Insignias Ganadas</p>
          <div className="flex gap-1 mt-2">
            {user.badges.slice(0, 3).map((b, i) => (
              <div key={i} className="w-8 h-8 rounded-full bg-whirlpool-light flex items-center justify-center text-whirlpool-blue border border-whirlpool-blue/20" title={b}>
                <Star size={14} fill="currentColor" />
              </div>
            ))}
            {user.badges.length > 3 && <span className="text-xs text-slate-400 self-center ml-1">+{user.badges.length - 3}</span>}
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Progress Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <h4 className="font-bold text-slate-800">Tu Crecimiento</h4>
            <select className="text-xs font-bold text-slate-500 bg-slate-50 border-none rounded-lg py-1 px-2">
              <option>Último mes</option>
              <option>Último año</option>
            </select>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00A1E4" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#00A1E4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="horas" stroke="#00A1E4" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recommended Prompts */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <h4 className="font-bold text-slate-800">Prompts para {user.area}</h4>
            <button onClick={() => onNavigate('library')} className="text-xs font-bold text-whirlpool-accent hover:underline">Ver todos</button>
          </div>
          <div className="space-y-4">
            {recommendedPrompts.slice(0, 3).map((prompt) => (
              <div key={prompt.id} className="p-4 rounded-xl bg-slate-50 hover:bg-whirlpool-light transition-colors cursor-pointer group">
                <p className="text-xs font-bold text-whirlpool-blue uppercase tracking-wider mb-1">{prompt.area}</p>
                <h5 className="font-bold text-slate-700 text-sm group-hover:text-whirlpool-blue transition-colors">{prompt.title}</h5>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">{prompt.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pending Courses */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h4 className="font-bold text-slate-800 text-xl">Cursos Recomendados</h4>
          <button onClick={() => onNavigate('courses')} className="text-sm font-bold text-whirlpool-accent hover:underline flex items-center gap-1">
            Explorar catálogo <ChevronRight size={16} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_COURSES.filter(c => c.status !== 'completed').map((course) => (
            <motion.div 
              key={course.id}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 group cursor-pointer"
              onClick={() => onNavigate('courses')}
            >
              <div className="relative h-40">
                <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 left-3">
                  <span className="bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-[10px] font-bold text-whirlpool-blue uppercase tracking-wider">
                    {course.level}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{course.area}</p>
                <h5 className="font-bold text-slate-800 group-hover:text-whirlpool-blue transition-colors">{course.title}</h5>
                <div className="flex items-center gap-4 mt-4 text-xs text-slate-500">
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    {course.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen size={14} />
                    {course.resources.length} recursos
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
