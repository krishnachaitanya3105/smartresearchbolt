'use client';

import * as React from 'react';
import { useEffect } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';
import { useAppStore } from '@/lib/store';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const { theme, setTheme } = useAppStore();

  return (
    <NextThemesProvider 
      {...props}
      defaultTheme={theme}
      onThemeChange={setTheme}
    >
      {children}
    </NextThemesProvider>
  );
}