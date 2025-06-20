'use client';

import Link from 'next/link';

export default function Home() {
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
          <Link href="/login" className="hover:underline text-white/80 hover:text-purple-300 transition">
            Login
          </Link>
        </nav>
      </header>

      <main className="z-10 relative flex flex-col flex-grow items-center justify-center text-center px-6 py-24 sm:py-32">
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-6 text-purple-300 drop-shadow">
          Track Bugs. Stay Zen.
        </h2>
        <p className="text-lg sm:text-xl text-gray-300 max-w-xl mb-10">
          Your companion for effortless bug tracking, time logging, and developer productivity.
        </p>
        <div className="flex gap-4 flex-col sm:flex-row">
          <Link
            href="/login"
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 text-white font-bold rounded-lg shadow-lg transition-all hover:shadow-xl"
          >
            Get Started
          </Link>
        </div>
      </main>

      <footer className="z-10 relative bg-black/50 text-center py-6 text-sm text-white/40 backdrop-blur-md border-t border-white/10">
        BugZen • Simple Bug Tracking • Built by Yazat ❤️
      </footer>
    </div>
  );
}