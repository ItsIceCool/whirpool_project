import React from 'react';
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  Download
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { MOCK_ANALYTICS } from '../mockData';
import { cn } from '../types';

const COLORS = ['#1D4E89', '#00A1E4', '#E6F6FC', '#94a3b8', '#cbd5e1'];

export const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-whirlpool-blue">Métricas Globales</h2>
          <p className="text-slate-500 mt-1">Panel de control estratégico para GIT Labs y Dirección.</p>
        </div>
        <button className="btn-outline">
          <Download size={18} />
          Exportar Reporte
        </button>
      </div>

      {/* High Level Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-50 text-whirlpool-blue rounded-xl">
              <Users size={24} />
            </div>
            <div className="flex items-center gap-1 text-xs font-bold text-green-500">
              <ArrowUpRight size={14} />
              8.5%
            </div>
          </div>
          <p className="text-slate-400 text-sm font-medium">Usuarios Activos</p>
          <h3 className="text-2xl font-bold text-slate-800 mt-1">{MOCK_ANALYTICS.activeUsers}</h3>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-emerald-50 text-emerald-500 rounded-xl">
              <BookOpen size={24} />
            </div>
            <div className="flex items-center gap-1 text-xs font-bold text-green-500">
              <ArrowUpRight size={14} />
              12%
            </div>
          </div>
          <p className="text-slate-400 text-sm font-medium">Tasa de Finalización</p>
          <h3 className="text-2xl font-bold text-slate-800 mt-1">{MOCK_ANALYTICS.completionRate}%</h3>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-amber-50 text-amber-500 rounded-xl">
              <TrendingUp size={24} />
            </div>
            <div className="flex items-center gap-1 text-xs font-bold text-red-500">
              <ArrowDownRight size={14} />
              2.1%
            </div>
          </div>
          <p className="text-slate-400 text-sm font-medium">Tiempo Promedio</p>
          <h3 className="text-2xl font-bold text-slate-800 mt-1">{MOCK_ANALYTICS.avgTimePerCourse}</h3>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-red-50 text-red-500 rounded-xl">
              <AlertCircle size={24} />
            </div>
          </div>
          <p className="text-slate-400 text-sm font-medium">Tasa de Abandono</p>
          <h3 className="text-2xl font-bold text-slate-800 mt-1">14.2%</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Activity Chart */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-8">
            <h4 className="font-bold text-slate-800 text-lg">Actividad Semanal</h4>
            <div className="flex gap-2">
              <span className="flex items-center gap-1 text-xs font-bold text-slate-400">
                <span className="w-2 h-2 bg-whirlpool-accent rounded-full"></span>
                Sesiones
              </span>
            </div>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_ANALYTICS.weeklyActivity}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="users" fill="#00A1E4" radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Area Distribution */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <h4 className="font-bold text-slate-800 text-lg mb-8">Participación por Área</h4>
          <div className="h-80 w-full flex flex-col md:flex-row items-center">
            <div className="h-full w-full md:w-1/2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={MOCK_ANALYTICS.engagementByArea}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {MOCK_ANALYTICS.engagementByArea.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full md:w-1/2 space-y-4">
              {MOCK_ANALYTICS.engagementByArea.map((entry, index) => (
                <div key={entry.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                    <span className="text-sm font-medium text-slate-600">{entry.name}</span>
                  </div>
                  <span className="text-sm font-bold text-slate-800">{entry.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Top Performers Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex items-center justify-between">
          <h4 className="font-bold text-slate-800 text-lg">Top 5 Áreas con Mayor Impacto</h4>
          <button className="text-sm font-bold text-whirlpool-accent hover:underline">Ver reporte completo</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50">
                <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Área</th>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Adopción IA</th>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Eficiencia Ganada</th>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Prompts Generados</th>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { area: 'Manufactura', adoption: '92%', efficiency: '+18%', prompts: 450, status: 'Líder' },
                { area: 'Ingeniería', adoption: '88%', efficiency: '+22%', prompts: 320, status: 'Avanzado' },
                { area: 'Marketing', adoption: '75%', efficiency: '+15%', prompts: 890, status: 'Avanzado' },
                { area: 'Logística', adoption: '68%', efficiency: '+12%', prompts: 150, status: 'En Crecimiento' },
                { area: 'RRHH', adoption: '45%', efficiency: '+5%', prompts: 80, status: 'Inicial' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="px-8 py-4 font-bold text-slate-700">{row.area}</td>
                  <td className="px-8 py-4 text-slate-600">{row.adoption}</td>
                  <td className="px-8 py-4 font-bold text-emerald-500">{row.efficiency}</td>
                  <td className="px-8 py-4 text-slate-600">{row.prompts}</td>
                  <td className="px-8 py-4">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                      row.status === 'Líder' ? "bg-whirlpool-blue text-white" : 
                      row.status === 'Avanzado' ? "bg-whirlpool-light text-whirlpool-blue" : "bg-slate-100 text-slate-500"
                    )}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
