import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type UserRole = 'manager' | 'developer' | null;

interface AuthState {
  isAuthenticated: boolean;
  role: UserRole;
  username: string | null;
  login: (role: UserRole, username: string) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      role: null,
      username: null,
      login: (role, username) => set({ isAuthenticated: true, role, username }),
      logout: () => set({ isAuthenticated: false, role: null, username: null }),
    }),
    { name: 'auth-storage' }
  )
);

export default useAuthStore;