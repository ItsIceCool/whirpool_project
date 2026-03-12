import React from 'react';
import { 
  Search, 
  Filter, 
  Copy, 
  Star, 
  Share2, 
  ExternalLink, 
  Lightbulb,
  Zap,
  CheckCircle2,
  Library
} from 'lucide-react';
import { motion } from 'motion/react';
import { PromptGem, Area, cn } from '../types';
import { MOCK_PROMPTS } from '../mockData';

export const LibraryPage: React.FC = () => {
  const [filter, setFilter] = React.useState<string>('Todos');
  const [search, setSearch] = React.useState<string>('');
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  const areas = ['Todos', ...Object.values(Area)];

  const filteredPrompts = MOCK_PROMPTS.filter(p => {
    const matchesFilter = filter === 'Todos' || p.area === filter;
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || 
                          p.description.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-whirlpool-blue rounded-3xl p-10 text-white relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-4xl font-black mb-4">Biblioteca de Gemas & Prompts</h2>
          <p className="text-whirlpool-light/80 text-lg leading-relaxed">
            El repositorio corporativo de Whirlpool donde la inteligencia colectiva se convierte en eficiencia operativa. Consulta, copia y aplica.
          </p>
          <div className="flex gap-4 mt-8">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-xl border border-white/10">
              <Zap size={20} className="text-whirlpool-accent" />
              <span className="text-sm font-bold">1,240 Prompts Activos</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-xl border border-white/10">
              <Lightbulb size={20} className="text-amber-400" />
              <span className="text-sm font-bold">GIT Labs Verified</span>
            </div>
          </div>
        </div>
        <div className="absolute right-0 top-0 w-1/3 h-full opacity-10 pointer-events-none">
          <Library size={300} className="rotate-12 translate-x-1/4" />
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar por objetivo, área o impacto..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm focus:ring-2 focus:ring-whirlpool-accent transition-all w-full"
            />
          </div>
          <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-4 py-2">
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
        <div className="flex gap-2">
          <button className="btn-outline">
            Mis Favoritos
          </button>
          <button className="btn-primary">
            Sugerir Nuevo Prompt
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filteredPrompts.map((prompt) => (
          <motion.div 
            key={prompt.id}
            whileHover={{ scale: 1.01 }}
            className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col lg:flex-row gap-8 group"
          >
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="bg-whirlpool-light text-whirlpool-blue px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                    {prompt.area}
                  </span>
                  <span className="text-slate-400 text-xs font-medium">Por {prompt.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-slate-400 hover:text-amber-500 transition-colors">
                    <Star size={20} fill={prompt.isFavorite ? "currentColor" : "none"} className={prompt.isFavorite ? "text-amber-500" : ""} />
                  </button>
                  <button className="p-2 text-slate-400 hover:text-whirlpool-blue transition-colors">
                    <Share2 size={20} />
                  </button>
                </div>
              </div>
              
              <h4 className="text-2xl font-bold text-slate-800 mb-2 group-hover:text-whirlpool-blue transition-colors">{prompt.title}</h4>
              <p className="text-slate-500 mb-6 leading-relaxed">{prompt.description}</p>
              
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 relative">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Prompt / Gema</p>
                <code className="text-sm text-slate-700 block whitespace-pre-wrap font-mono leading-relaxed">
                  {prompt.prompt}
                </code>
                <button 
                  onClick={() => handleCopy(prompt.id, prompt.prompt)}
                  className={cn(
                    "absolute top-4 right-4 p-2 rounded-lg transition-all flex items-center gap-2 text-xs font-bold",
                    copiedId === prompt.id ? "bg-emerald-500 text-white" : "bg-white text-whirlpool-blue shadow-sm border border-slate-100 hover:bg-whirlpool-light"
                  )}
                >
                  {copiedId === prompt.id ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                  {copiedId === prompt.id ? "Copiado" : "Copiar Prompt"}
                </button>
              </div>
            </div>

            <div className="lg:w-72 flex flex-col gap-4">
              <div className="bg-whirlpool-light/50 p-6 rounded-2xl border border-whirlpool-light">
                <p className="text-[10px] font-bold text-whirlpool-blue uppercase tracking-widest mb-2">Impacto de Negocio</p>
                <p className="text-sm font-bold text-slate-700">{prompt.impact}</p>
              </div>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Uso en Whirlpool</p>
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                      <img key={i} src={`https://i.pravatar.cc/100?u=p${prompt.id}${i}`} className="w-8 h-8 rounded-full border-2 border-white" alt="user" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-slate-600">+{prompt.usageCount} veces</span>
                </div>
              </div>
              <button className="btn-outline w-full py-3 mt-auto">
                Ver Guía de Uso
                <ExternalLink size={16} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
