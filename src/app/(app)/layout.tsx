'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Logo } from '@/components/logo';
import { Nav } from '@/components/nav';
import { UserNav } from '@/components/user-nav';
import { Skeleton } from '@/components/ui/skeleton';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // This is a simulation of auth check. In a real app, this would be more robust.
    const loggedIn = localStorage.getItem('isAuthenticated') === 'true';
    if (!loggedIn) {
      router.replace(`/login?redirect=${pathname}`);
    } else {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, [router, pathname]);

  if (isLoading || !isAuthenticated) {
    return (
      <div className="flex min-h-screen w-full flex-col">
        <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-card px-4 md:px-6">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-6 w-32" />
        </header>
        <main className="flex-1 p-4 md:p-8">
          <div className="space-y-4">
            <Skeleton className="h-12 w-1/4" />
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-card px-4 md:px-6">
        <div className="flex w-full items-center gap-4">
          <Logo />
          <Nav />
          <div className="ml-auto flex items-center gap-4">
            <UserNav />
          </div>
        </div>
      </header>
      <main className="flex-1 overflow-auto p-4 sm:p-6 md:p-8">{children}</main>
    </div>
  );
}
