'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div className="editorial-container min-h-[calc(100vh-64px)] flex items-center justify-center">
      <div className="max-w-md w-full space-y-12 py-12">
        <header className="text-center space-y-4">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Sign in to Scholar</h1>
          <p className="text-gray-500 font-medium text-sm">
            Or <Link href="/register" className="text-primary font-bold hover:underline">create an account</Link>
          </p>
        </header>

        <form className="space-y-8" onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Email Address</label>
              <input
                type="email"
                required
                className="w-full px-4 py-4 bg-white border-2 border-gray-100 rounded-xl focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all font-medium text-gray-900 shadow-sm"
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Password</label>
              <input
                type="password"
                required
                className="w-full px-4 py-4 bg-white border-2 border-gray-100 rounded-xl focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all font-medium text-gray-900 shadow-sm"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <button
              type="submit"
              className="w-full bg-gray-900 text-white font-bold text-[15px] py-4 rounded-xl hover:bg-black hover:shadow-lg hover:-translate-y-0.5 transition-all outline-none focus:ring-4 focus:ring-gray-900/30"
            >
              Enter Dashboard
            </button>
            <p className="text-center text-xs font-medium text-gray-400">
              By signing in, you agree to our Terms of Service.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
