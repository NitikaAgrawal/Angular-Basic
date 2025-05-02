export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  favorites: number[];
  isLandlord?: boolean;
}