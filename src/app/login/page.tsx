'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { users } from '@/data/users';

import useAuthStore from '@/store/AuthStore';
import Link from 'next/link';

export default function Login() {
  const router = useRouter();
  const { login, isAuthenticated, role } = useAuthStore();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isAuthenticated && role) {
      router.push(`/dashboard/${role.toLowerCase()}`);
    }
  }, [isAuthenticated, role, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      const roleForUrl = user.role.toLowerCase() as 'manager' | 'developer';
      login(roleForUrl, user.username);
      router.push(`/dashboard/${roleForUrl}`);
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="relative flex flex-col min-h-screen bg-black text-white font-sans overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden">
        <div className="absolute top-[10%] left-[20%] w-72 h-72 bg-purple-500 opacity-30 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-[15%] right-[10%] w-96 h-96 bg-fuchsia-600 opacity-30 rounded-full blur-3xl animate-pulse-slow2"></div>
      </div>

      <header className="dashboard-header">
        <div className="navbar-left">
          <span className="navbar-logo">🐞</span>
          <span className="navbar-title">BugZen</span>
        </div>
        <nav className="space-x-4">
          <Link href="/" className="hover:underline text-white/80 hover:text-purple-300 transition">
            Home
          </Link>
        </nav>
      </header>

      <main className="z-10 relative flex flex-col flex-grow items-center justify-center text-center px-6 py-24 sm:py-32">
        <div className="bg-gray-900/70 backdrop-blur-sm p-8 rounded-lg shadow-2xl border border-gray-700 w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6 text-purple-300">Login to BugZen</h2>
          
          {error && (
            <div className="bg-red-900/50 text-red-200 px-4 py-2 rounded mb-4">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2 text-left">
              <label htmlFor="username" className="block text-sm font-medium text-gray-300">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your username"
                required
              />
            </div>
            
            <div className="space-y-2 text-left">
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your password"
                required
              />
            </div>
            
            <div>
              <button
                type="submit"
                className="w-full px-8 py-3 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 text-white font-bold rounded-lg shadow-lg transition-all hover:shadow-xl"
              >
                Sign In
              </button>
            </div>
          </form>
          
          <div className="mt-4 text-sm text-gray-400">
            <p>Use one of the following accounts:</p>
            <p className="mt-1"><b>Developer:</b> dev1 / devpass</p>
            <p className="mt-1"><b>Manager:</b> manager1 / managerpass</p>
          </div>
        </div>
      </main>

      <footer className="z-10 relative bg-black/50 text-center py-6 text-sm text-white/40 backdrop-blur-md border-t border-white/10">
        BugZen • Simple Bug Tracking • Built by Yazat ❤️
      </footer>
    </div>
  );
}