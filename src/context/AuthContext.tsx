'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type User = {
  username: string;
  role: 'developer' | 'manager';
};

type AuthContextType = {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

import { users } from '@/data/users';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (username: string, password: string) => {
    const matched = users.find(
      (u) => u.username === username && u.password === password
    );
    if (matched) {
      setUser({ username: matched.username, role: matched.role });
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
