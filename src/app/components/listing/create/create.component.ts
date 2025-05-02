import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { ListingService } from '../../../services/listing.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-listing',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FormsModule],
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateListingComponent {
  private fb = inject(FormBuilder);
  private listingService = inject(ListingService);
  private router = inject(Router);

  amenitiesList = [
    'Gym/Fitness Center', 'Power Backup', 'Security System',
    'Swimming Pool', 'Garbage Disposal', 'Laundry Service',
    'Car Park', 'Private Lawn', 'Elevator',
    'Visitors Parking', 'Water Heater', 'Club House'
  ];

  propertyTypes = ['Apartment', 'House', 'Condo', 'Townhouse'];
  selectedFiles: File[] = [];
  previewUrls: string[] = [];

  listingForm = this.fb.group({
    propertyType: ['Apartment', Validators.required],
    propertyName: ['', Validators.required],
    isShared: ['No', Validators.required],
    address: ['', Validators.required],
    squareFeet: ['', [Validators.required, Validators.min(1)]],
    leaseType: ['Long term', Validators.required],
    price: ['', [Validators.required, Validators.min(1)]],
    isPriceNegotiable: [false],
    priceMode: ['Per Month', Validators.required],
    isFurnished: ['No', Validators.required],
    amenities: this.fb.array(
      this.amenitiesList.map(() => false)
    ),
    title: ['', Validators.required],
    description: ['', [Validators.required, Validators.maxLength(1400)]]
  });

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFiles = Array.from(input.files);
      this.previewUrls = [];
      
      for (let i = 0; i < this.selectedFiles.length; i++) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.previewUrls.push(e.target.result);
        };
        reader.readAsDataURL(this.selectedFiles[i]);
      }
    }
  }

  removeImage(index: number): void {
    this.previewUrls.splice(index, 1);
    this.selectedFiles.splice(index, 1);
  }

  onSubmit(): void {
    if (this.listingForm.valid) {
      const formValue = this.listingForm.value;
      const selectedAmenities = this.amenitiesList.filter((_, i) => formValue.amenities?.[i]);
      
      const newListing = {
        ...formValue,
        amenities: selectedAmenities,
        isShared: formValue.isShared === 'Yes',
        isFurnished: formValue.isFurnished === 'Yes',
        userId: 1, // Replace with actual user ID from auth service
        photos: this.previewUrls,
        comments: [],
        squareFeet: Number(formValue.squareFeet),
        price: Number(formValue.price)
      };

      this.listingService.addListing(newListing as any);
      this.router.navigate(['/listings']);
    }
  }

  get amenitiesFormArray() {
    return this.listingForm.get('amenities') as any;
  }
}