'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Bell } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Library', path: '/library' },
    { name: 'Resources', path: '/resources' },
  ];

  if (pathname === '/login' || pathname === '/register') return null;

  return (
    <nav className="w-full bg-white border-b border-gray-100 h-[72px] flex items-center shrink-0 sticky top-0 z-50 shadow-sm">
      <div className="w-full px-6 md:px-12 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-10 h-full">
          <Link href="/" className="flex items-center space-x-2">
             <div className="w-8 h-8 bg-gradient-to-br from-primary to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm tracking-tighter">LM</span>
             </div>
             <span className="text-[18px] font-bold tracking-tight text-gray-900 hidden sm:block">LearningSystem</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8 h-full pt-1">
            {navItems.map((item) => (
              item.path === '/resources' ? (
                <Link 
                  key={item.name} 
                  href={item.path} 
                  className={`text-[14px] font-semibold transition h-[71px] flex items-center border-b-[3px] ${
                    pathname === item.path
                      ? 'text-primary border-primary' 
                      : 'text-gray-500 hover:text-gray-900 border-transparent'
                  }`}
                >
                  {item.name}
                </Link>
              ) : (
                <Link 
                  key={item.name} 
                  href={item.path === '#' ? '/' : item.path} 
                  className={`text-[14px] font-semibold transition h-[71px] flex items-center border-b-[3px] ${
                    pathname === item.path || (item.path === '/' && pathname.startsWith('/subject'))
                      ? 'text-primary border-primary' 
                      : 'text-gray-500 hover:text-gray-900 border-transparent'
                  }`}
                >
                  {item.name}
                </Link>
              )
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <button className="text-gray-400 hover:text-primary transition">
            <Bell className="w-[20px] h-[20px]" />
          </button>
          {user ? (
             <div className="flex items-center gap-4">
               <div className="relative group">
                  <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-[13px] font-bold text-white cursor-pointer shadow-md border-2 border-white ring-2 ring-gray-900/20 hover:scale-105 transition-transform">
                     {user.name.split(' ').map((n: string) => n[0]).join('').substring(0,2).toUpperCase()}
                  </div>
                  <div className="absolute right-0 top-full pt-1 w-48 opacity-0 group-hover:opacity-100 transition-all pointer-events-none group-hover:pointer-events-auto z-50">
                    <div className="bg-white shadow-[0_10px_40px_rgba(0,0,0,0.08)] rounded-2xl py-2 border border-gray-100 font-sans transform origin-top-right group-hover:scale-100 scale-95 transition-transform overflow-hidden">
                       <div className="px-5 py-3.5 border-b border-gray-50 mb-1 bg-gray-50/50">
                          <p className="text-[14px] font-bold text-gray-900 truncate leading-snug">{user.name}</p>
                          <p className="text-[11px] font-medium text-gray-500 truncate mt-0.5">{user.email}</p>
                       </div>
                       <div className="p-1">
                         <Link href="/profile" className="block w-full text-left px-4 py-2.5 text-[13px] font-bold text-gray-600 hover:bg-primary/5 hover:text-primary rounded-xl transition-colors">View Profile</Link>
                         <button onClick={logout} className="w-full text-left px-4 py-2.5 text-[13px] font-bold text-red-600 hover:bg-red-50 rounded-xl transition-colors">Log Out</button>
                       </div>
                    </div>
                  </div>
               </div>
             </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link href="/login" className="px-6 py-2.5 bg-gray-900 text-white text-[14px] font-bold rounded-xl hover:bg-black hover:shadow-lg hover:-translate-y-0.5 transition-all outline-none focus:ring-4 focus:ring-gray-900/30">
                Sign In
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
