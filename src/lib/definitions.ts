export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  hospital: string;
  rating: number;
  reviews: number;
  avatarId: string;
};

export type Appointment = {
  id: string;
  doctorName: string;
  specialty: string;
  date: Date;
  time: string;
  type: string;
  status: 'upcoming' | 'past';
};
