import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgPipesModule } from "ngx-pipes";
import { Daterangepicker } from "ng2-daterangepicker";
import { HttpClientModule } from "@angular/common/http";
import { Routes, RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";

import { RentalComponent } from "./rental.component";
import { RentalListComponent } from "./rental-list/rental-list.component";
import { RentalDetailComponent } from "./rental-detail/rental-detail.component";
import { RentalListItemComponent } from "./rental-list-item/rental-list-item.component";
import { RentalDetailBookingComponent } from "./rental-detail/rental-detail-booking/rental-detail-booking.component";

import { RentalService } from "./shared/rental.service";
import { BookingService } from "../booking/shared/booking.service";
import { HelperService } from "../common/service/helper.service";

import { UpperCasePipe } from "../common/pipes/uppercase.pipe";
import { MapModule } from "../common/map/map.module";

import { AuthGuard } from "../auth/shared/auth.guard";

const routes: Routes = [
  {
    path: "rentals",
    component: RentalComponent,
    children: [
      { path: "", component: RentalListComponent },
      {
        path: ":rentalId",
        component: RentalDetailComponent,
        canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  declarations: [
    RentalComponent,
    RentalListComponent,
    RentalListItemComponent,
    RentalDetailComponent,
    UpperCasePipe,
    RentalDetailBookingComponent
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    RouterModule.forChild(routes),
    NgPipesModule,
    MapModule,
    Daterangepicker,
    FormsModule
  ],
  providers: [RentalService, HelperService, BookingService]
})
export class RentalModule {}
