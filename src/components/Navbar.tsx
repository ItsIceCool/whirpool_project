import React from 'react';
import { Bell, Search, Globe, ChevronDown } from 'lucide-react';
import { User } from '../types';

interface NavbarProps {
  user: User;
}

export const Navbar: React.FC<NavbarProps> = ({ user }) => {
  return (
    <header className="h-16 bg-white border-bottom border-slate-200 px-8 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Buscar cursos, prompts, ayuda..." 
            className="w-full bg-slate-50 border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-whirlpool-accent transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-slate-500 hover:text-whirlpool-blue cursor-pointer transition-colors">
          <Globe size={18} />
          <span className="text-sm font-medium">ES</span>
          <ChevronDown size={14} />
        </div>

        <button className="relative p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-all">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="h-8 w-px bg-slate-200"></div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-slate-700">GIT Labs</p>
            <p className="text-[10px] text-slate-400 font-medium uppercase tracking-tighter">Innovation Center</p>
          </div>
          <div className="w-8 h-8 rounded-lg bg-whirlpool-blue flex items-center justify-center text-white text-xs font-bold">
            GIT
          </div>
        </div>
      </div>
    </header>
  );
};
