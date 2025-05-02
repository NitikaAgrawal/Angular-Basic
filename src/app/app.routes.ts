import { Routes } from '@angular/router';
import { ListingListComponent } from './components/listing/list/list.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'listings', component: ListingListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { 
    path: 'create-listing', 
    loadComponent: () => import('./components/listing/create/create.component').then(m => m.CreateListingComponent),
    canActivate: [authGuard]
  },
  { 
    path: 'listings/:id', 
    loadComponent: () => import('./components/listing/details/details.component').then(m => m.ListingDetailsComponent)
  },
  { 
    path: 'profile', 
    loadComponent: () => import('./components/profile/profile.component').then(m => m.ProfileComponent),
    canActivate: [authGuard]
  },
  { 
    path: 'favorites', 
    loadComponent: () => import('./components/favorites/favorites.component').then(m => m.FavoritesComponent),
    canActivate: [authGuard]
  },
  { path: '**', redirectTo: '/listings' }
];