import { Component, OnInit } from "@angular/core";
import { Rental } from "../shared/rental.model";
import { RentalService } from "../shared/rental.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: "bapp-rental-create",
  templateUrl: "./rental-create.component.html",
  styleUrls: ["./rental-create.component.scss"]
})
export class RentalCreateComponent implements OnInit {
  newRental: Rental;
  rentalCategories = Rental.CATEGORIES;
  errors: any[] = [];

  constructor(private rentalService: RentalService, private router: Router) {}

  ngOnInit() {
    this.newRental = new Rental();
    this.newRental.shared = false;
  }

  handleImageChange() {
    this.newRental.image =
      "https://images1.apartments.com/i2/P0s3lHrhIIPXfyhkVz0wMZXOqFj2m3Rg_Pa-OdKQIQk/111/the-500-atlanta-ga-refined-apartment-living---elite-upgrade.jpg";
  }

  createRental() {
    this.rentalService.createRental(this.newRental).subscribe(
      (rental: Rental) => {
        this.router.navigate(["/rentals/" + rental._id]);
      },
      (errorResp: HttpErrorResponse) => {
        this.errors = errorResp.error.errors;
      }
    );
  }
}
