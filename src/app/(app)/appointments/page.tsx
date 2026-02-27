'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, PlusCircle } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { appointments, doctors } from '@/lib/data';
import { type Appointment, type Doctor } from '@/lib/definitions';
import { cn } from '@/lib/utils';
import { PlaceHolderImages } from '@/lib/placeholder-images';

function AppointmentCard({ appointment }: { appointment: Appointment }) {
  const doctor = doctors.find((d) => d.name === appointment.doctorName);
  const avatar = PlaceHolderImages.find((p) => p.id === doctor?.avatarId);
  return (
    <div className="flex items-center space-x-4 rounded-md border p-4">
      <Avatar className="h-12 w-12">
        {avatar && <AvatarImage src={avatar.imageUrl} alt={doctor?.name} />}
        <AvatarFallback>
          {appointment.doctorName.charAt(3).toUpperCase()}
          {appointment.doctorName.split(' ')[1].charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium leading-none">
          {appointment.doctorName}
        </p>
        <p className="text-sm text-muted-foreground">
          {appointment.specialty}
        </p>
      </div>
      <div className="text-right">
        <p className="text-sm font-semibold">
          {format(appointment.date, 'PPP')}
        </p>
        <p className="text-sm text-muted-foreground">{appointment.time}</p>
      </div>
    </div>
  );
}

function ScheduleAppointmentDialog() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Schedule New Appointment
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Schedule an Appointment</DialogTitle>
          <DialogDescription>
            Choose a doctor, date, and time for your virtual consultation.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="doctor" className="text-right">
              Doctor
            </Label>
            <Select>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a doctor" />
              </SelectTrigger>
              <SelectContent>
                {doctors.map((doctor) => (
                  <SelectItem key={doctor.id} value={doctor.id}>
                    {doctor.name} - {doctor.specialty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" className="text-right">
              Date
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={'outline'}
                  className={cn(
                    'col-span-3 justify-start text-left font-normal',
                    !date && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, 'PPP') : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Confirm Appointment</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function AppointmentsPage() {
  const upcomingAppointments = appointments.filter(
    (a) => a.status === 'upcoming'
  );
  const pastAppointments = appointments.filter((a) => a.status === 'past');

  return (
    <div className="container mx-auto p-0">
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>My Appointments</CardTitle>
              <CardDescription>
                View and manage your appointments.
              </CardDescription>
            </div>
            <ScheduleAppointmentDialog />
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="upcoming">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
            </TabsList>
            <TabsContent value="upcoming" className="mt-6">
              <div className="space-y-4">
                {upcomingAppointments.length > 0 ? (
                  upcomingAppointments.map((appointment) => (
                    <AppointmentCard
                      key={appointment.id}
                      appointment={appointment}
                    />
                  ))
                ) : (
                  <p className="text-center text-muted-foreground pt-8">
                    No upcoming appointments.
                  </p>
                )}
              </div>
            </TabsContent>
            <TabsContent value="past" className="mt-6">
              <div className="space-y-4">
                {pastAppointments.length > 0 ? (
                  pastAppointments.map((appointment) => (
                    <AppointmentCard
                      key={appointment.id}
                      appointment={appointment}
                    />
                  ))
                ) : (
                  <p className="text-center text-muted-foreground pt-8">
                    No past appointments found.
                  </p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
