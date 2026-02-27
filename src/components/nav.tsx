'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Stethoscope } from 'lucide-react';
import { useState } from 'react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Logo } from './logo';

const navItems = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/symptom-checker', label: 'Symptom Checker' },
  { href: '/providers', label: 'Find a Doctor' },
  { href: '/appointments', label: 'Appointments' },
];

export function Nav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Nav */}
      <div className="md:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open main menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <div className="flex flex-col h-full">
              <div className="border-b -mx-6 px-6 pb-4">
                <Logo />
              </div>
              <nav className="mt-8 flex flex-col gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      'flex items-center rounded-md p-3 text-lg font-medium transition-colors',
                      pathname === item.href
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:bg-muted'
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      {/* Desktop Nav */}
      <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'transition-colors hover:text-primary',
              pathname.startsWith(item.href) ? 'text-primary' : 'text-muted-foreground'
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </>
  );
}
