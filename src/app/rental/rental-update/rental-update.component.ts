import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RentalService } from '../shared/rental.service';
import { Rental } from '../shared/rental.model';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'bapp-rental-update',
  templateUrl: './rental-update.component.html',
  styleUrls: ['./rental-update.component.scss'],
})
export class RentalUpdateComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private rentalService: RentalService,
    private toastr: ToastrService
  ) {}

  rental: Rental;

  rentalCategories: string[] = Rental.CATEGORIES;

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.getRental(params['rentalId']);
    });
  }

  getRental(rentalId: string) {
    this.rentalService.getRentalById(rentalId).subscribe((rental: Rental) => {
      this.rental = rental;
    });
  }

  updateRental(rentalId: string, rentalData: any) {
    this.rentalService.updateRental(rentalId, rentalData).subscribe(
      (updatedRental: Rental) => {
        this.rental = updatedRental;
      },
      (errorResp: HttpErrorResponse) => {
        this.toastr.error(errorResp.error.errors[0].detail, 'Error', { timeOut: 10000 });
        this.getRental(rentalId);
      }
    );
  }
}
