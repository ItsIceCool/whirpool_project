import React from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Library, 
  MessageSquare, 
  BarChart3, 
  Settings, 
  LogOut,
  Users,
  Database,
  HelpCircle,
  User as UserIcon
} from 'lucide-react';
import { UserRole, User } from '../types';
import { cn } from '../types';

interface SidebarProps {
  activePage: string;
  setActivePage: (page: string) => void;
  user: User;
}

export const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage, user }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: [UserRole.USER, UserRole.CONTENT_ADMIN, UserRole.SUPER_ADMIN] },
    { id: 'courses', label: 'Cursos', icon: BookOpen, roles: [UserRole.USER, UserRole.CONTENT_ADMIN, UserRole.SUPER_ADMIN] },
    { id: 'library', label: 'Biblioteca de Prompts', icon: Library, roles: [UserRole.USER, UserRole.CONTENT_ADMIN, UserRole.SUPER_ADMIN] },
    { id: 'chatbot', label: 'Asistente IA', icon: MessageSquare, roles: [UserRole.USER, UserRole.CONTENT_ADMIN, UserRole.SUPER_ADMIN] },
    { id: 'faq', label: 'Ayuda & FAQ', icon: HelpCircle, roles: [UserRole.USER, UserRole.CONTENT_ADMIN, UserRole.SUPER_ADMIN] },
  ];

  const adminItems = [
    { id: 'admin-dashboard', label: 'Métricas Globales', icon: BarChart3, roles: [UserRole.SUPER_ADMIN] },
    { id: 'content-management', label: 'Gestión de Contenido', icon: Database, roles: [UserRole.CONTENT_ADMIN, UserRole.SUPER_ADMIN] },
    { id: 'user-management', label: 'Usuarios & Roles', icon: Users, roles: [UserRole.SUPER_ADMIN] },
  ];

  const filteredMenu = menuItems.filter(item => item.roles.includes(user.role));
  const filteredAdmin = adminItems.filter(item => item.roles.includes(user.role));

  return (
    <aside className="w-64 bg-white border-r border-slate-200 h-screen sticky top-0 flex flex-col transition-all duration-300">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-whirlpool-blue rounded-lg flex items-center justify-center text-white font-bold text-xl">W</div>
        <div>
          <h1 className="text-whirlpool-blue font-bold text-lg leading-tight">Whirlpool</h1>
          <p className="text-slate-400 text-xs font-medium tracking-widest uppercase">AI Hub</p>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        <div className="py-4">
          <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Menú Principal</p>
          {filteredMenu.map((item) => (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={cn(
                "sidebar-item w-full",
                activePage === item.id && "sidebar-item-active"
              )}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </div>

        {filteredAdmin.length > 0 && (
          <div className="py-4 border-t border-slate-100">
            <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Administración</p>
            {filteredAdmin.map((item) => (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={cn(
                  "sidebar-item w-full",
                  activePage === item.id && "sidebar-item-active"
                )}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        )}
      </nav>

      <div className="p-4 border-t border-slate-100">
        <button 
          onClick={() => setActivePage('profile')}
          className="flex items-center gap-3 w-full p-2 rounded-xl hover:bg-whirlpool-light transition-colors group"
        >
          <div className="w-10 h-10 rounded-full bg-whirlpool-accent/20 flex items-center justify-center text-whirlpool-accent">
            <UserIcon size={20} />
          </div>
          <div className="text-left overflow-hidden">
            <p className="text-sm font-bold text-slate-700 truncate">{user.name}</p>
            <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">{user.area}</p>
          </div>
        </button>
        <button className="mt-4 flex items-center gap-3 w-full px-4 py-3 text-slate-500 hover:text-red-500 transition-colors">
          <LogOut size={20} />
          <span className="font-medium">Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
};
