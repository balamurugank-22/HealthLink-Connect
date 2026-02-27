export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  hospitalId: string;
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

export type Hospital = {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phoneNumber: string;
  website: string;
  description: string;
  imageId: string;
};
