import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Listing } from '../../../interfaces/listing';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TruncatePipe } from '../../../pipes/truncate.pipe';

@Component({
  selector: 'app-listing-card',
  standalone: true,
  imports: [CommonModule, RouterModule, TruncatePipe],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class ListingCardComponent {
  @Input() listing!: Listing;
  @Input() isFavorite = false;
  @Input() showFavoriteButton = true;
  @Output() favoriteToggled = new EventEmitter<number>();

toggleFavorite(): void {
  this.favoriteToggled.emit(this.listing.id);
}
   getImageUrl(): string {
    // Return first photo if available, otherwise default image
    return this.listing.photos && this.listing.photos.length > 0 
      ? this.listing.photos[0] 
      : 'assets/default-listing.jpg';
  }
}