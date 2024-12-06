import type { Hairstyle } from '../types';

export const hairstyles: Hairstyle[] = [
  {
    id: '1',
    name: 'Modern Pompadour',
    description: 'A classic style with a modern twist, featuring high volume on top and shorter sides.',
    imageUrl: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800&fit=crop&auto=format',
    suitableFor: ['square face', 'oval face'],
    maintenanceLevel: 'high',
  },
  {
    id: '2',
    name: 'Textured Crop',
    description: 'A low-maintenance cut with natural texture and movement.',
    imageUrl: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800&fit=crop&auto=format',
    suitableFor: ['round face', 'oval face'],
    maintenanceLevel: 'low',
  },
  {
    id: '3',
    name: 'Slick Back',
    description: 'A sophisticated style that works well for both casual and formal occasions.',
    imageUrl: 'https://images.unsplash.com/photo-1520975661595-6453be3f7070?w=800&fit=crop&auto=format',
    suitableFor: ['diamond face', 'oval face'],
    maintenanceLevel: 'medium',
  },
];