import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name: string;
  plan: 'starter' | 'professional' | 'enterprise';
  credits: {
    total: number;
    used: number;
    remaining: number;
  };
}

interface Report {
  id: string;
  title: string;
  summary: string;
  createdAt: string;
  status: 'generating' | 'completed' | 'failed';
  hasLiveData?: boolean;
}

interface AppState {
  // Auth
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setAuthenticated: (authenticated: boolean) => void;
  
  // Reports
  reports: Report[];
  addReport: (report: Report) => void;
  updateReport: (id: string, updates: Partial<Report>) => void;
  setReports: (reports: Report[]) => void;
  
  // Credits
  updateCredits: (credits: User['credits']) => void;
  
  // UI
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Auth
      user: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      
      // Reports
      reports: [],
      addReport: (report) => set((state) => ({ reports: [report, ...state.reports] })),
      updateReport: (id, updates) =>
        set((state) => ({
          reports: state.reports.map((report) =>
            report.id === id ? { ...report, ...updates } : report
          ),
        })),
      setReports: (reports) => set({ reports }),
      
      // Credits
      updateCredits: (credits) =>
        set((state) => ({
          user: state.user ? { ...state.user, credits } : null,
        })),
      
      // UI
      theme: 'system',
      setTheme: (theme) => set({ theme }),
      sidebarOpen: false,
      setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
    }),
    {
      name: 'smart-research-store',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        reports: state.reports,
        theme: state.theme,
      }),
    }
  )
);