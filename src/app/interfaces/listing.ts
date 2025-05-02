export interface Listing {
  id: number;
  title: string;
  description: string;
  price: number;
  address: string;
  squareFeet: number;
  isShared: boolean;
  leaseType: 'Long term' | 'Short term' | 'Both';
  isPriceNegotiable: boolean;
  priceMode: 'Per Month' | 'Utilities included in rent';
  isFurnished: boolean;
  amenities: string[];
  photos: string[];
  userId: number;
  comments: Comment[];
  propertyType: string;
  propertyName: string;
}

export interface Comment {
  id: number;
  userId: number;
  userName: string;
  content: string;
  createdAt: Date;
}