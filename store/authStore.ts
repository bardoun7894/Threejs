import { create } from 'zustand';
import { AuthState } from '../types';

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  error: null,
  login: async (email: string) => {
    set({ isLoading: true, error: null });
    
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Simulate basic validation check server-side
    if (email.includes('error')) {
      set({ isLoading: false, error: 'Invalid credentials provided.' });
      return;
    }

    set({ 
      isLoading: false, 
      user: { 
        id: '1', 
        email, 
        name: email.split('@')[0] 
      } 
    });
  },
  logout: () => set({ user: null })
}));