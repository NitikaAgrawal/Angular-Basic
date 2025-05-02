import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: User[] = [
    { id: 1, name: 'Admin', email: 'admin@example.com', password: 'admin123', favorites: [] }
  ];
  private currentUser: User | null = null;

  register(user: Omit<User, 'id' | 'favorites'>): boolean {
    const newUser = { ...user, id: this.users.length + 1, favorites: [] };
    this.users.push(newUser);
    return true;
  }

  login(email: string, password: string): boolean {
    const user = this.users.find(u => u.email === email && u.password === password);
    if (user) {
      this.currentUser = user;
      return true;
    }
    return false;
  }

  logout(): void {
    this.currentUser = null;
  }

  isAuthenticated(): boolean {
    return !!this.currentUser;
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  toggleFavorite(listingId: number): void {
    if (!this.currentUser) return;
    
    const index = this.currentUser.favorites.indexOf(listingId);
    if (index === -1) {
      this.currentUser.favorites.push(listingId);
    } else {
      this.currentUser.favorites.splice(index, 1);
    }
  }

  isFavorite(listingId: number): boolean {
    return this.currentUser?.favorites.includes(listingId) ?? false;
  }
}


