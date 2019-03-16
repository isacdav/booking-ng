import { Component, OnInit } from '@angular/core';
import { RentalService } from '../shared/rental.service';
import { Rental } from '../shared/rental.model';

@Component({
  selector: 'bapp-rental-list',
  templateUrl: './rental-list.component.html',
  styleUrls: ['./rental-list.component.scss']
})

export class RentalListComponent implements OnInit {

  constructor(private rentalService: RentalService) { }

  rentals: Rental[] = [];

  ngOnInit() {
    const rentalObservable = this.rentalService.getRentals();

    rentalObservable.subscribe(
      (rentals: Rental[]) => {
        this.rentals = rentals;
      },
      (err) => {

      },
      () => {

      }
    );
  }

}
