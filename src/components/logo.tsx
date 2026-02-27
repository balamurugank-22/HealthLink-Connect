import { Stethoscope } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        'flex items-center gap-2 text-primary outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm',
        className
      )}
    >
      <Stethoscope className="h-7 w-7" />
      <span className="text-xl font-bold">HealthLink</span>
      <span className="text-xl font-bold text-accent">Connect</span>
    </Link>
  );
}
