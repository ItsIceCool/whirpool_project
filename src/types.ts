import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  CONTENT_ADMIN = 'CONTENT_ADMIN',
  USER = 'USER'
}

export enum Area {
  MANUFACTURING = 'Manufactura',
  MARKETING = 'Marketing',
  HR = 'Recursos Humanos',
  OPERATIONS = 'Operaciones',
  LOGISTICS = 'Logística',
  ENGINEERING = 'Ingeniería',
  SALES = 'Ventas',
  MANAGEMENT = 'Dirección'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  area: Area;
  progress: number;
  completedCourses: number;
  badges: string[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  area: Area;
  duration: string;
  level: 'Básico' | 'Intermedio' | 'Avanzado';
  status: 'pending' | 'in-progress' | 'completed';
  thumbnail: string;
  resources: Resource[];
}

export interface Resource {
  id: string;
  type: 'pdf' | 'video' | 'link' | 'sheet' | 'slide';
  title: string;
  url: string;
  size?: string;
}

export interface PromptGem {
  id: string;
  title: string;
  description: string;
  prompt: string;
  area: Area;
  impact: string;
  author: string;
  usageCount: number;
  isFavorite: boolean;
}
