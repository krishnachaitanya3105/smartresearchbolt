'use client';

import { SessionProvider } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { useAppStore } from '@/lib/store';
import { useEffect } from 'react';

function AuthSync({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const { setUser, setAuthenticated } = useAppStore();

  useEffect(() => {
    if (status === 'loading') return;

    if (session?.user) {
      setUser({
        id: session.user.id || '1',
        email: session.user.email || '',
        name: session.user.name || '',
        plan: (session.user as any).plan || 'professional',
        credits: (session.user as any).credits || {
          total: 50,
          used: 3,
          remaining: 47,
        },
      });
      setAuthenticated(true);
    } else {
      setUser(null);
      setAuthenticated(false);
    }
  }, [session, status, setUser, setAuthenticated]);

  return <>{children}</>;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AuthSync>{children}</AuthSync>
    </SessionProvider>
  );
}