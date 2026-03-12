/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { User as UserIcon } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { CoursesPage } from './components/CoursesPage';
import { CourseDetail } from './components/CourseDetail';
import { LibraryPage } from './components/LibraryPage';
import { Chatbot } from './components/Chatbot';
import { AdminDashboard } from './components/AdminDashboard';
import { FAQ } from './components/FAQ';
import { Login } from './components/Login';
import { User, UserRole, Course } from './types';
import { MOCK_USER } from './mockData';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User>(MOCK_USER);
  const [activePage, setActivePage] = useState('dashboard');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const handleLogin = (role: UserRole, email?: string) => {
    setUser({
      ...MOCK_USER,
      role: role,
      email: email || MOCK_USER.email,
      name: role === UserRole.SUPER_ADMIN ? 'Admin Whirlpool' : role === UserRole.CONTENT_ADMIN ? 'Editor GIT Labs' : email ? email.split('@')[0].replace('.', ' ') : MOCK_USER.name
    });
    setIsLoggedIn(true);
  };

  const handleSelectCourse = (course: Course) => {
    setSelectedCourse(course);
    setActivePage('course-detail');
  };

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard user={user} onNavigate={setActivePage} />;
      case 'courses':
        return <CoursesPage onSelectCourse={handleSelectCourse} />;
      case 'course-detail':
        return selectedCourse ? (
          <CourseDetail 
            course={selectedCourse} 
            onBack={() => setActivePage('courses')} 
          />
        ) : <Dashboard user={user} onNavigate={setActivePage} />;
      case 'library':
        return <LibraryPage />;
      case 'chatbot':
        return <Chatbot />;
      case 'admin-dashboard':
        return <AdminDashboard />;
      case 'faq':
        return <FAQ />;
      case 'profile':
        return (
          <div className="py-20 text-center bg-white rounded-3xl shadow-sm border border-slate-100">
            <div className="w-24 h-24 bg-whirlpool-light rounded-full flex items-center justify-center mx-auto mb-6 text-whirlpool-blue">
              <UserIcon size={48} />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">{user.name}</h2>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs mt-1">{user.area}</p>
            <div className="mt-8 flex justify-center gap-4">
              <div className="bg-slate-50 p-4 rounded-2xl w-32">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Cursos</p>
                <p className="text-xl font-black text-whirlpool-blue">{user.completedCourses}</p>
              </div>
            </div>
          </div>
        );
      default:
        return <Dashboard user={user} onNavigate={setActivePage} />;
    }
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="flex min-h-screen bg-whirlpool-gray">
      <Sidebar activePage={activePage} setActivePage={setActivePage} user={user} />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar user={user} />
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {renderPage()}
          </div>
        </main>
        <footer className="p-6 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest border-t border-slate-200 bg-white">
          Whirlpool AI Learning Hub • GIT Labs Innovation Center • © 2026
        </footer>
      </div>
    </div>
  );
}
