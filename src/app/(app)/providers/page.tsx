'use client';

import { useState } from 'react';
import { Search, Star } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { doctors } from '@/lib/data';
import { type Doctor } from '@/lib/definitions';
import { hospitals } from '@/lib/hospitals';
import { PlaceHolderImages } from '@/lib/placeholder-images';

function DoctorCard({ doctor }: { doctor: Doctor }) {
  const avatar = PlaceHolderImages.find((p) => p.id === doctor.avatarId);
  const hospital = hospitals.find((h) => h.id === doctor.hospitalId);
  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-16 w-16">
          {avatar && <AvatarImage src={avatar.imageUrl} alt={doctor.name} />}
          <AvatarFallback>
            {doctor.name.charAt(3).toUpperCase()}
            {doctor.name.split(' ')[1].charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <CardTitle>{doctor.name}</CardTitle>
          <CardDescription>{doctor.specialty}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground">{hospital?.name}</p>
        <div className="mt-2 flex items-center gap-1">
          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
          <span className="font-semibold">{doctor.rating}</span>
          <span className="text-sm text-muted-foreground">
            ({doctor.reviews} reviews)
          </span>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Book Appointment</Button>
      </CardFooter>
    </Card>
  );
}

export default function ProvidersPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDoctors = doctors.filter((doctor) => {
    const hospital = hospitals.find((h) => h.id === doctor.hospitalId);
    return (
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (hospital && hospital.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  return (
    <div className="container mx-auto p-0">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Find Your Doctor
          </h1>
          <p className="text-muted-foreground">
            Search for specialists and book your next appointment.
          </p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by name, specialty, or hospital..."
            className="w-full pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredDoctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
        {filteredDoctors.length === 0 && (
          <div className="col-span-full text-center py-16">
            <p className="text-muted-foreground">No doctors found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
