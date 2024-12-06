export interface Hairstyle {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  suitableFor: string[];
  maintenanceLevel: 'low' | 'medium' | 'high';
}

export interface UserPhoto {
  imageUrl: string;
  timestamp: number;
}