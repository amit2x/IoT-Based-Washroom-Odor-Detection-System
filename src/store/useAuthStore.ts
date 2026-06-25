import { create } from 'zustand';

export interface UserProfile {
  id: string;
  name: string;
  role: 'AAI_ADMIN' | 'TERMINAL_ADMIN';
}

interface AuthState {
  user: UserProfile | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (adminId: string, secretKey: string) => Promise<boolean>;
  logout: () => void;
  initialize: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,

  login: async (adminId: string, secretKey: string) => {
    set({ isLoading: true });
    try {
      // Simulate API call to FastAPI backend
      // In production this will fetch '/api/v1/auth/login'
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Determine role based on ID prefix
      // ID starting with ADM -> AAI_ADMIN, otherwise TERMINAL_ADMIN
      const role: 'AAI_ADMIN' | 'TERMINAL_ADMIN' = 
        adminId.toUpperCase().startsWith('ADM') ? 'AAI_ADMIN' : 'TERMINAL_ADMIN';
      
      const user: UserProfile = {
        id: adminId,
        name: role === 'AAI_ADMIN' ? 'System Administrator' : 'Terminal Operator',
        role
      };

      const mockToken = `mock-jwt-token-${role.toLowerCase()}-${Date.now()}`;
      
      // Set cookies for middleware
      document.cookie = `auth_token=${mockToken}; path=/; max-age=86400; SameSite=Strict`;
      document.cookie = `auth_role=${role}; path=/; max-age=86400; SameSite=Strict`;

      set({
        user,
        token: mockToken,
        isAuthenticated: true,
        isLoading: false
      });
      return true;
    } catch (error) {
      set({ isLoading: false });
      return false;
    }
  },

  logout: () => {
    // Delete cookies
    document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Strict';
    document.cookie = 'auth_role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Strict';
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false
    });
  },

  initialize: () => {
    if (typeof window === 'undefined') return;
    
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
      return null;
    };

    const token = getCookie('auth_token');
    const roleCookie = getCookie('auth_role');

    if (token && roleCookie) {
      const role = roleCookie as 'AAI_ADMIN' | 'TERMINAL_ADMIN';
      set({
        user: {
          id: role === 'AAI_ADMIN' ? 'ADM-7700-X' : 'OP-9921-A',
          name: role === 'AAI_ADMIN' ? 'System Administrator' : 'Terminal Operator',
          role
        },
        token,
        isAuthenticated: true,
        isLoading: false
      });
    } else {
      set({ isLoading: false });
    }
  }
}));
