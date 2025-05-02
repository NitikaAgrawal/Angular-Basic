import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListingService } from '../../services/listing.service';
import { AuthService } from '../../services/auth.service';
import { ListingCardComponent } from '../listing/card/card.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, ListingCardComponent, RouterModule],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent {
  private listingService = inject(ListingService);
  private authService = inject(AuthService);

  get favoriteListings() {
    const favoriteIds = this.authService.getCurrentUser()?.favorites || [];
    return this.listingService.getListings()
      .filter(listing => favoriteIds.includes(listing.id));
  }
  toggleFavorite(listingId: number): void {
    this.authService.toggleFavorite(listingId);
  }
}
