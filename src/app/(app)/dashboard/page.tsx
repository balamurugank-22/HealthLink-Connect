'use client';

import Link from 'next/link';
import {
  ArrowRight,
  Calendar,
  HeartPulse,
  Plus,
  Search,
} from 'lucide-react';
import { format } from 'date-fns';

import { useUser } from '@/firebase';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { appointments } from '@/lib/data';
import { type Appointment } from '@/lib/definitions';
import { cn } from '@/lib/utils';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { doctors } from '@/lib/data';

const quickActions = [
  {
    title: 'Check Symptoms',
    description: 'Use our AI tool',
    href: '/symptom-checker',
    icon: HeartPulse,
  },
  {
    title: 'Find a Doctor',
    description: 'Browse specialists',
    href: '/providers',
    icon: Search,
  },
  {
    title: 'Book Appointment',
    description: 'Schedule a visit',
    href: '/appointments',
    icon: Calendar,
  },
];

export default function DashboardPage() {
  const { user } = useUser();
  const upcomingAppointments = appointments
    .filter((a) => a.status === 'upcoming')
    .slice(0, 2);

  return (
    <div className="container mx-auto p-0">
      <div className="space-y-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome, {user?.displayName?.split(' ')[0] || 'User'}
        </h1>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {quickActions.map((action) => (
            <Card
              key={action.title}
              className="hover:shadow-lg transition-shadow"
            >
              <Link href={action.href} className="block h-full">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    {action.title}
                  </CardTitle>
                  <action.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    {action.description}
                  </p>
                  <div className="text-2xl font-bold text-primary mt-2">
                    Get Started
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Upcoming Appointments</CardTitle>
              <CardDescription>
                You have {upcomingAppointments.length} upcoming appointments.
              </CardDescription>
            </div>
            <Button asChild>
              <Link href="/appointments">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {upcomingAppointments.length > 0 ? (
              <div className="space-y-4">
                {upcomingAppointments.map((appointment) => {
                  const doctor = doctors.find(
                    (d) => d.name === appointment.doctorName
                  );
                  const avatar = PlaceHolderImages.find(
                    (p) => p.id === doctor?.avatarId
                  );
                  return (
                    <div
                      key={appointment.id}
                      className="flex items-center justify-between rounded-lg border p-4"
                    >
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          {avatar && (
                            <AvatarImage
                              src={avatar.imageUrl}
                              alt={doctor?.name}
                            />
                          )}
                          <AvatarFallback>
                            {appointment.doctorName.charAt(3).toUpperCase()}
                            {appointment.doctorName
                              .split(' ')[1]
                              .charAt(0)
                              .toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">
                            {appointment.doctorName}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {appointment.specialty}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          {format(appointment.date, 'EEEE, MMM d')}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {appointment.time}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed p-12 text-center">
                <p className="text-muted-foreground">
                  You have no upcoming appointments.
                </p>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Book an Appointment
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
