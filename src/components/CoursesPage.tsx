import React from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  Filter, 
  Clock, 
  BookOpen, 
  ChevronRight, 
  CheckCircle2,
  PlayCircle
} from 'lucide-react';
import { Course, Area } from '../types';
import { MOCK_COURSES } from '../mockData';
import { cn } from '../types';

interface CoursesPageProps {
  onSelectCourse: (course: Course) => void;
}

export const CoursesPage: React.FC<CoursesPageProps> = ({ onSelectCourse }) => {
  const [filter, setFilter] = React.useState<string>('Todos');
  const [search, setSearch] = React.useState<string>('');

  const areas = ['Todos', ...Object.values(Area)];

  const filteredCourses = MOCK_COURSES.filter(c => {
    const matchesFilter = filter === 'Todos' || c.area === filter;
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) || 
                          c.description.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold text-whirlpool-blue">Catálogo de Cursos</h2>
          <p className="text-slate-500 mt-1">Explora lecciones diseñadas por GIT Labs para potenciar tu área.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar curso..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-whirlpool-accent transition-all w-full sm:w-64"
            />
          </div>
          <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2">
            <Filter size={18} className="text-slate-400" />
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="text-sm font-bold text-slate-600 bg-transparent border-none focus:ring-0 cursor-pointer"
            >
              {areas.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCourses.map((course) => (
          <motion.div 
            key={course.id}
            whileHover={{ y: -8 }}
            className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 group flex flex-col"
          >
            <div className="relative h-48">
              <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <button 
                  onClick={() => onSelectCourse(course)}
                  className="w-full btn-primary py-3"
                >
                  <PlayCircle size={20} />
                  Continuar Aprendizaje
                </button>
              </div>
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold text-whirlpool-blue uppercase tracking-wider shadow-sm">
                  {course.level}
                </span>
                {course.status === 'completed' && (
                  <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1">
                    <CheckCircle2 size={12} />
                    Completado
                  </span>
                )}
              </div>
            </div>
            
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] font-bold text-whirlpool-accent uppercase tracking-widest">{course.area}</p>
                <div className="flex items-center gap-1 text-slate-400 text-xs font-medium">
                  <Clock size={14} />
                  {course.duration}
                </div>
              </div>
              <h4 className="text-xl font-bold text-slate-800 group-hover:text-whirlpool-blue transition-colors mb-3">{course.title}</h4>
              <p className="text-sm text-slate-500 line-clamp-3 mb-6 flex-1">{course.description}</p>
              
              <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                      <img key={i} src={`https://i.pravatar.cc/100?u=${course.id}${i}`} className="w-6 h-6 rounded-full border-2 border-white" alt="user" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">+120 inscritos</span>
                </div>
                <button 
                  onClick={() => onSelectCourse(course)}
                  className="text-whirlpool-blue hover:text-whirlpool-accent transition-colors"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="py-20 text-center">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
            <Search size={32} />
          </div>
          <h3 className="text-xl font-bold text-slate-700">No encontramos cursos</h3>
          <p className="text-slate-500 mt-1">Intenta con otros filtros o términos de búsqueda.</p>
        </div>
      )}
    </div>
  );
};
