import { NgModule } from "@angular/core";
import { MapModule } from "../common/map/map.module";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { NgPipesModule } from "ngx-pipes";
import { Daterangepicker } from "ng2-daterangepicker";
import { HttpClientModule } from "@angular/common/http";
import { Routes, RouterModule } from "@angular/router";

import { RentalComponent } from "./rental.component";
import { RentalListComponent } from "./rental-list/rental-list.component";
import { RentalSearchComponent } from "./rental-search/rental-search.component";
import { RentalCreateComponent } from "./rental-create/rental-create.component";
import { RentalDetailComponent } from "./rental-detail/rental-detail.component";
import { RentalListItemComponent } from "./rental-list-item/rental-list-item.component";
import { RentalDetailBookingComponent } from "./rental-detail/rental-detail-booking/rental-detail-booking.component";

import { RentalService } from "./shared/rental.service";
import { HelperService } from "../common/service/helper.service";
import { BookingService } from "../booking/shared/booking.service";

import { AuthGuard } from "../auth/shared/auth.guard";
import { UpperCasePipe } from "../common/pipes/uppercase.pipe";

const routes: Routes = [
  {
    path: "rentals",
    component: RentalComponent,
    children: [
      { path: "", component: RentalListComponent },
      {
        path: "new",
        component: RentalCreateComponent,
        canActivate: [AuthGuard]
      },
      {
        path: ":rentalId",
        component: RentalDetailComponent
      },
      {
        path: ":city/homes",
        component: RentalSearchComponent
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
    RentalDetailBookingComponent,
    RentalSearchComponent,
    RentalCreateComponent
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
