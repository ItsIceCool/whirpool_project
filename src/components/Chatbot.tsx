import React, { useState } from 'react';
import { 
  Send, 
  Bot, 
  User as UserIcon, 
  Sparkles, 
  MessageSquare,
  ChevronRight,
  HelpCircle,
  Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../types';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '¡Hola! Soy tu asistente inteligente de Whirlpool. ¿En qué puedo ayudarte hoy con respecto a la IA o la plataforma?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: 'He analizado tu consulta. Basado en la base de conocimientos de GIT Labs, te recomiendo revisar el curso "IA Aplicada a la Manufactura 4.0" para profundizar en ese tema específico.',
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1500);
  };

  const suggestions = [
    '¿Cómo crear un prompt efectivo?',
    '¿Qué es una Gema de IA?',
    '¿Cómo usar la biblioteca de prompts?',
    'Soporte técnico GIT Labs'
  ];

  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
      {/* Chat Header */}
      <div className="p-6 border-b border-slate-100 bg-whirlpool-blue text-white flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center">
            <Bot size={28} />
          </div>
          <div>
            <h3 className="font-bold text-lg">Asistente Whirlpool AI</h3>
            <div className="flex items-center gap-2 text-xs text-whirlpool-accent font-bold">
              <span className="w-2 h-2 bg-whirlpool-accent rounded-full animate-pulse"></span>
              EN LÍNEA
            </div>
          </div>
        </div>
        <button className="p-2 hover:bg-white/10 rounded-xl transition-colors">
          <Search size={20} />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={cn(
                "flex gap-4 max-w-[80%]",
                msg.sender === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
              )}
            >
              <div className={cn(
                "w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0",
                msg.sender === 'user' ? "bg-whirlpool-accent text-white" : "bg-white text-whirlpool-blue shadow-sm border border-slate-100"
              )}>
                {msg.sender === 'user' ? <UserIcon size={20} /> : <Bot size={20} />}
              </div>
              <div className={cn(
                "p-4 rounded-2xl shadow-sm",
                msg.sender === 'user' ? "bg-whirlpool-blue text-white rounded-tr-none" : "bg-white text-slate-700 border border-slate-100 rounded-tl-none"
              )}>
                <p className="text-sm leading-relaxed">{msg.text}</p>
                <p className={cn(
                  "text-[10px] mt-2 font-medium opacity-50",
                  msg.sender === 'user' ? "text-right" : "text-left"
                )}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isTyping && (
          <div className="flex gap-4 mr-auto">
            <div className="w-10 h-10 rounded-2xl bg-white text-whirlpool-blue shadow-sm border border-slate-100 flex items-center justify-center">
              <Bot size={20} />
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-100 flex gap-1">
              <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]"></span>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-6 bg-white border-t border-slate-100">
        <div className="flex flex-wrap gap-2 mb-4">
          {suggestions.map((s, i) => (
            <button 
              key={i} 
              onClick={() => setInput(s)}
              className="text-xs font-bold text-slate-500 bg-slate-50 hover:bg-whirlpool-light hover:text-whirlpool-blue px-3 py-1.5 rounded-full border border-slate-100 transition-all"
            >
              {s}
            </button>
          ))}
        </div>
        <div className="flex gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Escribe tu duda aquí..."
              className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-6 pr-12 text-sm focus:ring-2 focus:ring-whirlpool-accent transition-all"
            />
            <Sparkles className="absolute right-4 top-1/2 -translate-y-1/2 text-whirlpool-accent opacity-50" size={20} />
          </div>
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="w-14 h-14 bg-whirlpool-accent text-white rounded-2xl flex items-center justify-center hover:bg-whirlpool-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-whirlpool-accent/20"
          >
            <Send size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};
