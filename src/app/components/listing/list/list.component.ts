import { Component, inject } from '@angular/core';
import { ListingService } from '../../../services/listing.service';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ListingCardComponent } from '../card/card.component';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-listing-list',
  standalone: true,
  imports: [CommonModule, RouterModule, ListingCardComponent, HeaderComponent],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListingListComponent {
  private listingService = inject(ListingService);
  private authService = inject(AuthService);

  listings = this.listingService.getListings();
  isAuthenticated = this.authService.isAuthenticated();

  toggleFavorite(listingId: number): void {
    this.authService.toggleFavorite(listingId);
  }

  isFavorite(listingId: number): boolean {
    return this.authService.isFavorite(listingId);
  }
}