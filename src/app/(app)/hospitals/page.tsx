'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Globe, MapPin, Phone, Search } from 'lucide-react';

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
import { type Hospital } from '@/lib/definitions';
import { hospitals } from '@/lib/hospitals';
import { PlaceHolderImages } from '@/lib/placeholder-images';

function HospitalCard({ hospital }: { hospital: Hospital }) {
  const image = PlaceHolderImages.find((p) => p.id === hospital.imageId);
  return (
    <Card className="flex flex-col">
      <div className="relative h-48 w-full">
        {image && (
          <Image
            src={image.imageUrl}
            alt={hospital.name}
            fill
            className="object-cover rounded-t-lg"
            data-ai-hint={image.imageHint}
          />
        )}
      </div>
      <CardHeader>
        <CardTitle>{hospital.name}</CardTitle>
        <CardDescription className="flex items-center pt-1">
          <MapPin className="mr-2 h-4 w-4 flex-shrink-0" />
          <span className="truncate">
            {hospital.address}, {hospital.city}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {hospital.description}
        </p>
        <div className="mt-4 flex items-center text-sm text-muted-foreground">
          <Phone className="mr-2 h-4 w-4 flex-shrink-0" />
          <span>{hospital.phoneNumber}</span>
        </div>
        <div className="mt-2 flex items-center text-sm text-muted-foreground">
          <Globe className="mr-2 h-4 w-4 flex-shrink-0" />
          <a
            href={hospital.website}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary hover:underline truncate"
          >
            Visit Website
          </a>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="secondary" className="w-full">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function HospitalsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredHospitals = hospitals.filter(
    (hospital) =>
      hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-0">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Find a Hospital
          </h1>
          <p className="text-muted-foreground">
            Search for hospitals and healthcare facilities in your area.
          </p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by name or location..."
            className="w-full pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredHospitals.map((hospital) => (
            <HospitalCard key={hospital.id} hospital={hospital} />
          ))}
        </div>
        {filteredHospitals.length === 0 && (
          <div className="col-span-full text-center py-16">
            <p className="text-muted-foreground">
              No hospitals found matching your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
