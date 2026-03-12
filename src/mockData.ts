import { UserRole, Area, User, Course, PromptGem } from './types';

export const MOCK_USER: User = {
  id: 'w-12345',
  name: 'Alejandro Martínez',
  email: 'alejandro.martinez@whirlpool.com',
  role: UserRole.USER,
  area: Area.ENGINEERING,
  progress: 65,
  completedCourses: 4,
  badges: ['Fast Learner', 'AI Pioneer', 'Prompt Master'],
};

export const MOCK_COURSES: Course[] = [
  {
    id: 'c1',
    title: 'Introducción a Gemini en Whirlpool',
    description: 'Aprende los fundamentos de la IA generativa y cómo Gemini puede optimizar tus tareas diarias en la oficina.',
    area: Area.MANAGEMENT,
    duration: '2h 30m',
    level: 'Básico',
    status: 'completed',
    thumbnail: 'https://picsum.photos/seed/ai1/400/250',
    resources: [
      { id: 'r1', type: 'pdf', title: 'Guía de Inicio Rápido', url: '#', size: '1.2 MB' },
      { id: 'r2', type: 'video', title: 'Video Bienvenida GIT Labs', url: '#' },
    ]
  },
  {
    id: 'c2',
    title: 'IA Aplicada a la Manufactura 4.0',
    description: 'Descubre cómo los modelos de lenguaje ayudan en la detección de anomalías y optimización de líneas de producción.',
    area: Area.MANUFACTURING,
    duration: '4h 15m',
    level: 'Intermedio',
    status: 'in-progress',
    thumbnail: 'https://picsum.photos/seed/factory/400/250',
    resources: [
      { id: 'r3', type: 'slide', title: 'Presentación Estratégica', url: '#', size: '4.5 MB' },
      { id: 'r4', type: 'sheet', title: 'Dataset de Práctica', url: '#', size: '0.8 MB' },
    ]
  },
  {
    id: 'c3',
    title: 'Marketing Predictivo con Gemini',
    description: 'Crea campañas personalizadas y analiza el sentimiento del consumidor usando herramientas avanzadas de IA.',
    area: Area.MARKETING,
    duration: '3h 45m',
    level: 'Avanzado',
    status: 'pending',
    thumbnail: 'https://picsum.photos/seed/marketing/400/250',
    resources: []
  },
  {
    id: 'c4',
    title: 'Optimización de Logística y Cadena de Suministro',
    description: 'Uso de prompts avanzados para la gestión de inventarios y rutas de distribución global.',
    area: Area.LOGISTICS,
    duration: '5h 00m',
    level: 'Avanzado',
    status: 'pending',
    thumbnail: 'https://picsum.photos/seed/logistics/400/250',
    resources: []
  }
];

export const MOCK_PROMPTS: PromptGem[] = [
  {
    id: 'p1',
    title: 'Analizador de Reportes de Calidad',
    description: 'Extrae los puntos críticos de fallas en componentes de lavadoras a partir de texto no estructurado.',
    prompt: 'Actúa como un ingeniero de calidad de Whirlpool. Analiza el siguiente reporte y enumera las 3 causas raíz más probables...',
    area: Area.ENGINEERING,
    impact: 'Reducción del 15% en tiempo de diagnóstico.',
    author: 'Ing. Roberto Garza',
    usageCount: 450,
    isFavorite: true,
  },
  {
    id: 'p2',
    title: 'Generador de Copys para Retail',
    description: 'Crea descripciones de producto optimizadas para e-commerce basadas en especificaciones técnicas.',
    prompt: 'Genera 3 opciones de descripción para una estufa de inducción destacando el ahorro energético y diseño premium...',
    area: Area.MARKETING,
    impact: 'Aumento del 20% en velocidad de publicación.',
    author: 'Lucía Santos',
    usageCount: 890,
    isFavorite: false,
  },
  {
    id: 'p3',
    title: 'Optimizador de Turnos de Producción',
    description: 'Balanceo de cargas de trabajo considerando ausentismo y habilidades del personal.',
    prompt: 'Tengo una línea de producción con 20 operarios. 2 faltaron hoy. Reasigna las estaciones para mantener el 90% de eficiencia...',
    area: Area.MANUFACTURING,
    impact: 'Mejora en la continuidad operativa.',
    author: 'GIT Labs Team',
    usageCount: 120,
    isFavorite: true,
  }
];

export const MOCK_ANALYTICS = {
  activeUsers: 4250,
  completionRate: 78,
  avgTimePerCourse: '3.5h',
  engagementByArea: [
    { name: 'Manufactura', value: 35 },
    { name: 'Ingeniería', value: 25 },
    { name: 'Marketing', value: 15 },
    { name: 'Logística', value: 15 },
    { name: 'Otros', value: 10 },
  ],
  weeklyActivity: [
    { day: 'Lun', users: 1200 },
    { day: 'Mar', users: 1500 },
    { day: 'Mie', users: 1800 },
    { day: 'Jue', users: 1400 },
    { day: 'Vie', users: 1100 },
    { day: 'Sab', users: 400 },
    { day: 'Dom', users: 200 },
  ]
};
