import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ListingService } from '../../../services/listing.service';
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { Listing } from '../../../interfaces/listing';
import { Comment } from '../../../interfaces/listing';

@Component({
  selector: 'app-listing-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class ListingDetailsComponent {
  private route = inject(ActivatedRoute);
  public router = inject(Router);
  private listingService = inject(ListingService);
  private authService = inject(AuthService);

  listing: Listing | undefined;
  newComment = '';

  constructor() {
    const id = this.route.snapshot.params['id'];
    this.listing = this.listingService.getListingById(+id);
    
    if (!this.listing) {
      this.router.navigate(['/listings']);
    }
  }

  addComment(): void {
    if (!this.newComment.trim() || !this.listing) return;

    const user = this.authService.getCurrentUser();
    if (!user) return;

    this.listingService.addComment(this.listing.id, {
      userId: user.id,
      userName: user.name,
      content: this.newComment
    });

    // Refresh the listing to show the new comment
    this.listing = this.listingService.getListingById(this.listing.id);
    this.newComment = '';
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
}