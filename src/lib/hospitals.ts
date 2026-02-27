import { type Hospital } from './definitions';

export const hospitals: Hospital[] = [
  {
    id: '1',
    name: 'Kovai Medical Center and Hospital',
    address: '99, Avinashi Rd, SITRA',
    city: 'Coimbatore',
    state: 'Tamil Nadu',
    zipCode: '641014',
    phoneNumber: '+91 422 432 3800',
    website: 'https://www.kmchhospitals.com/',
    description:
      'A leading multi-specialty hospital in Coimbatore known for its advanced healthcare services and patient-centric approach.',
    imageId: 'hospital-1',
  },
  {
    id: '2',
    name: 'PSG Hospitals',
    address: 'Peelamedu',
    city: 'Coimbatore',
    state: 'Tamil Nadu',
    zipCode: '641004',
    phoneNumber: '+91 422 257 0170',
    website: 'https://psghospitals.com/',
    description:
      'A well-established teaching hospital offering a wide range of medical services with a focus on quality care and medical education.',
    imageId: 'hospital-2',
  },
  {
    id: '3',
    name: 'G. Kuppuswamy Naidu Memorial Hospital',
    address: 'P.B. No. 6327, Nethaji Road, Pappanaickenpalayam',
    city: 'Coimbatore',
    state: 'Tamil Nadu',
    zipCode: '641037',
    phoneNumber: '+91 422 224 5000',
    website: 'https://www.gknmhospital.org/',
    description:
      'A trusted healthcare institution with a long history of serving the community, known for its ethical practices and comprehensive medical care.',
    imageId: 'hospital-3',
  },
  {
    id: '4',
    name: 'Sri Ramakrishna Hospital',
    address: '395, Sarojini Naidu Rd, New Siddhapudur',
    city: 'Coimbatore',
    state: 'Tamil Nadu',
    zipCode: '641044',
    phoneNumber: '+91 422 450 0000',
    website: 'https://www.sriramakrishnahospital.com/',
    description:
      'A multi-specialty hospital providing high-quality healthcare services with state-of-the-art facilities and a team of experienced doctors.',
    imageId: 'hospital-4',
  },
];
