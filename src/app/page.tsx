import Link from 'next/link';
import Image from 'next/image';
import {
  Activity,
  HeartPulse,
  Search,
  Stethoscope,
  CalendarDays,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Logo } from '@/components/logo';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const features = [
  {
    icon: <Search className="h-8 w-8 text-primary" />,
    title: 'Provider Directory',
    description:
      'Easily browse and search for available hospitals and doctors. View detailed profiles and specialties to find the right care for you.',
  },
  {
    icon: <HeartPulse className="h-8 w-8 text-primary" />,
    title: 'AI Symptom Checker',
    description:
      'Our intelligent chatbot guides you through a symptom assessment, providing preliminary recommendations and advice on when to seek help.',
  },
  {
    icon: <CalendarDays className="h-8 w-8 text-primary" />,
    title: 'Virtual Appointments',
    description:
      'Schedule and manage virtual consultations with your chosen healthcare providers directly through our secure patient portal.',
  },
  {
    icon: <Activity className="h-8 w-8 text-primary" />,
    title: 'Personalized Dashboard',
    description:
      'Access your upcoming appointments, recent interactions, and key health information at a glance on your personal dashboard.',
  },
];

export default function LandingPage() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-background');
  
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Logo />
          <div className="flex items-center gap-2">
            <Button variant="ghost" asChild>
              <Link href="/login">Log In</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Register</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="relative py-20 md:py-32">
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover"
              data-ai-hint={heroImage.imageHint}
              priority
            />
          )}
          <div className="absolute inset-0 bg-primary/80" />
          <div className="container relative z-10 text-center text-primary-foreground">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Your Health, Connected.
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl">
              HealthLink Connect provides a seamless and secure platform to
              manage your healthcare needs, from finding a doctor to virtual
              consultations.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/register">Get Started</Link>
              </Button>
              <Button size="lg" variant="secondary" asChild>
                <Link href="/login">Patient Login</Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="features" className="py-20 md:py-28">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                A New Era of Healthcare Management
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                All the tools you need for your healthcare journey, right at
                your fingertips.
              </p>
            </div>
            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <Card key={feature.title} className="text-center">
                  <CardHeader>
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                      {feature.icon}
                    </div>
                    <CardTitle className="mt-4">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="container flex flex-col items-center justify-between gap-4 py-8 md:flex-row">
          <div className="flex items-center gap-2">
            <Stethoscope className="h-6 w-6 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              HealthLink Connect &copy; {new Date().getFullYear()}
            </p>
          </div>
          <nav className="flex gap-4">
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Terms of Service
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
