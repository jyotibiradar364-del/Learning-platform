'use client';

import { Download, FileText, LayoutTemplate, Palette, Video, PenTool, LayoutGrid } from 'lucide-react';

export default function ResourcesPage() {
  const resources = [
    {
      title: 'Digital Typography Handbook',
      description: 'A comprehensive 40-page PDF guide on typesetting for the modern web.',
      type: 'PDF Guide',
      icon: <FileText className="w-8 h-8 text-white" />,
      grad: 'from-blue-500 to-indigo-600',
      tag: 'Reading'
    },
    {
      title: 'Editorial Design UI Kit',
      description: 'The exact Figma components used to build this platform. Free for students.',
      type: 'Figma Community',
      icon: <LayoutGrid className="w-8 h-8 text-white" />,
      grad: 'from-purple-500 to-fuchsia-600',
      tag: 'Design'
    },
    {
      title: 'Glassmorphism Texture Pack',
      description: 'High-res transparent noise and glass textures to elevate your backgrounds.',
      type: 'Asset Pack',
      icon: <Palette className="w-8 h-8 text-white" />,
      grad: 'from-emerald-400 to-teal-500',
      tag: 'Assets'
    },
    {
      title: 'Grid Architecture Templates',
      description: 'Boilerplate HTML/CSS files featuring 60/30 asymmetrical split layouts.',
      type: 'Code Snippets',
      icon: <LayoutTemplate className="w-8 h-8 text-white" />,
      grad: 'from-orange-400 to-rose-500',
      tag: 'Code'
    },
    {
      title: 'Color Grading Masterclass',
      description: 'Unlisted YouTube workshop on creating harmonious UI palettes.',
      type: 'Workshop',
      icon: <Video className="w-8 h-8 text-white" />,
      grad: 'from-cyan-400 to-blue-500',
      tag: 'Video'
    },
    {
      title: 'Foundational SVG Icons',
      description: 'A custom, purely stroked icon set built on a precise 24px grid.',
      type: 'Asset Pack',
      icon: <PenTool className="w-8 h-8 text-white" />,
      grad: 'from-pink-500 to-rose-600',
      tag: 'Design'
    }
  ];

  return (
    <div className="w-full bg-gray-50 min-h-[calc(100vh-72px)] pb-24">
      {/* Hero Header */}
      <section className="bg-white pt-20 pb-20 border-b border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-primary/10 to-purple-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="absolute top-20 left-10 w-[300px] h-[300px] bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center">
          <span className="inline-block text-[12px] font-black uppercase tracking-widest text-primary bg-primary/10 px-5 py-2.5 rounded-full ring-1 ring-primary/20 shadow-sm mb-6">
            Free Toolkit
          </span>
          <h1 className="text-[48px] md:text-[64px] leading-[1.05] font-black text-gray-900 tracking-tight mb-6 relative inline-block">
            Student Resources
            <div className="absolute -bottom-2 left-0 right-0 h-4 bg-yellow-300/40 -z-10 -rotate-1 rounded-full"></div>
          </h1>
          <p className="text-[18px] md:text-[20px] text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed">
            Download exclusive assets, templates, and guides designed specifically to complement your learning journey and elevate your final projects.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resources.map((item, idx) => (
            <div key={idx} className="bg-white rounded-[24px] p-8 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1.5 transition-all duration-300 group flex flex-col h-full relative overflow-hidden">
              
              {/* Decorative top grad */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r opacity-50 group-hover:opacity-100 transition-opacity duration-500 ${item.grad}"></div>

              <div className="flex justify-between items-start mb-6">
                 <div className={`w-[72px] h-[72px] rounded-2xl bg-gradient-to-br ${item.grad} flex items-center justify-center shadow-lg shadow-gray-200 transform group-hover:rotate-6 group-hover:scale-110 transition duration-500`}>
                    {item.icon}
                 </div>
                 <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400 bg-gray-50 px-3 py-1.5 rounded-full ring-1 ring-gray-100">
                   {item.tag}
                 </span>
              </div>
              
              <div className="flex-1 space-y-3">
                 <h2 className="text-[22px] font-extrabold text-gray-900 tracking-tight leading-snug">{item.title}</h2>
                 <p className="text-[15px] font-medium text-gray-500 leading-relaxed">
                   {item.description}
                 </p>
              </div>

              <div className="pt-8 mt-auto">
                 <button onClick={() => alert(`${item.title} downloading...`)} className="w-full flex items-center justify-center gap-2.5 py-4 rounded-xl text-[15px] font-bold text-gray-700 bg-gray-50 border-2 border-transparent group-hover:border-primary/20 group-hover:bg-primary/5 group-hover:text-primary transition-all">
                    <Download className="w-[18px] h-[18px]" />
                    Download {item.type}
                 </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
