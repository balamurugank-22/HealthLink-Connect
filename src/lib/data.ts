import { type Doctor, type Appointment } from './definitions';

export const doctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Emily Carter',
    specialty: 'Cardiology',
    hospitalId: '1',
    rating: 4.9,
    reviews: 128,
    avatarId: 'doctor-1',
  },
  {
    id: '2',
    name: 'Dr. Ben Adams',
    specialty: 'Pediatrics',
    hospitalId: '2',
    rating: 4.8,
    reviews: 95,
    avatarId: 'doctor-2',
  },
  {
    id: '3',
    name: 'Dr. Chloe Davis',
    specialty: 'Dermatology',
    hospitalId: '3',
    rating: 4.9,
    reviews: 210,
    avatarId: 'doctor-3',
  },
  {
    id: '4',
    name: 'Dr. Marcus Chen',
    specialty: 'Neurology',
    hospitalId: '4',
    rating: 4.7,
    reviews: 78,
    avatarId: 'doctor-4',
  },
];

export const appointments: Appointment[] = [
  {
    id: '1',
    doctorName: 'Dr. Emily Carter',
    specialty: 'Cardiology',
    date: new Date(new Date().setDate(new Date().getDate() + 7)),
    time: '10:00 AM',
    type: 'Virtual Consultation',
    status: 'upcoming',
  },
  {
    id: '2',
    doctorName: 'Dr. Ben Adams',
    specialty: 'Pediatrics',
    date: new Date(new Date().setDate(new Date().getDate() + 14)),
    time: '2:30 PM',
    type: 'Virtual Consultation',
    status: 'upcoming',
  },
  {
    id: '3',
    doctorName: 'Dr. Chloe Davis',
    specialty: 'Dermatology',
    date: new Date(new Date().setDate(new Date().getDate() - 10)),
    time: '11:00 AM',
    type: 'Follow-up',
    status: 'past',
  },
   {
    id: '4',
    doctorName: 'Dr. Emily Carter',
    specialty: 'Cardiology',
    date: new Date(new Date().setDate(new Date().getDate() - 30)),
    time: '09:00 AM',
    type: 'Annual Check-up',
    status: 'past',
  },
];
