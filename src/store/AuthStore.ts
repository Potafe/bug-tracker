import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type UserRole = 'manager' | 'dev' | null;

interface AuthState {
  isAuthenticated: boolean;
  role: UserRole;
  login: (role: UserRole) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      role: null,
      login: (role) => set({ isAuthenticated: true, role }),
      logout: () => set({ isAuthenticated: false, role: null }),
    }),
    { name: 'auth-storage' }
  )
);

export default useAuthStore;