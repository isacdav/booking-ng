import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RentalService } from "../shared/rental.service";
import { Rental } from "../shared/rental.model";

@Component({
  selector: "bapp-rental-detail",
  templateUrl: "./rental-detail.component.html",
  styleUrls: ["./rental-detail.component.scss"]
})
export class RentalDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private rentalService: RentalService
  ) {}

  rental: Rental;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getRental(params["rentalId"]);
    });
  }

  getRental(rentalId: string) {
    this.rentalService.getRentalById(rentalId).subscribe((rental: Rental) => {
      this.rental = rental;
    });
  }
}
