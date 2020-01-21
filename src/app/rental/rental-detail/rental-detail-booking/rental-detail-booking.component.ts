import * as moment from "moment";
import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ViewEncapsulation
} from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { DaterangePickerComponent } from "ng2-daterangepicker";

import { Rental } from "../../shared/rental.model";
import { Booking } from "../../../booking/shared/booking.model";
import { HelperService } from "../../../common/service/helper.service";
import { BookingService } from "../../../booking/shared/booking.service";
import { AuthService } from "src/app/auth/shared/auth.service";

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: "bapp-rental-detail-booking",
  templateUrl: "./rental-detail-booking.component.html",
  styleUrls: ["./rental-detail-booking.component.scss"]
})
export class RentalDetailBookingComponent implements OnInit {
  @Input() rental: Rental;

  @ViewChild(DaterangePickerComponent)
  private picker: DaterangePickerComponent;

  newBooking: Booking;
  daterange: any = {};
  bookedOutDays: any[] = [];
  modalRef: any;
  errors: any[] = [];

  options: any = {
    locale: { format: Booking.DATE_FORMAT },
    alwaysShowCalendars: false,
    autoUpdateInput: false,
    opens: "left",
    isInvalidDate: this.invalidDates.bind(this)
  };

  constructor(
    private helper: HelperService,
    private modalService: NgbModal,
    private bookingService: BookingService,
    private toastr: ToastrService,
    public auth: AuthService
  ) {}

  ngOnInit() {
    this.newBooking = new Booking();
    this.getBookedOutDates();
  }

  private invalidDates(date) {
    return (
      this.bookedOutDays.includes(this.helper.getDateFormatedBooking(date)) ||
      date.diff(moment(), "days") < 0
    );
  }

  private addNewBookedDays(bookingData: any) {
    const dateRange = this.helper.getBookingRangeOfDates(
      bookingData.startAt,
      bookingData.endAt
    );
    this.bookedOutDays.push(...dateRange);
  }

  private getBookedOutDates() {
    const bookings: Booking[] = this.rental.bookings;

    if (bookings && bookings.length > 0) {
      bookings.forEach((booking: Booking) => {
        const dateRange = this.helper.getBookingRangeOfDates(
          booking.startAt,
          booking.endAt
        );
        this.bookedOutDays.push(...dateRange);
      });
    }
  }

  private resetDatePicker() {
    this.picker.datePicker.setStartDate(moment());
    this.picker.datePicker.setEndDate(moment());
    this.picker.datePicker.element.val("");
  }

  openConfirmModal(content) {
    this.errors = [];
    this.modalRef = this.modalService.open(content);
  }

  createBooking() {
    this.newBooking.rental = this.rental;

    this.bookingService.crateBooking(this.newBooking).subscribe(
      bookingData => {
        this.addNewBookedDays(bookingData);
        this.newBooking = new Booking();
        this.modalRef.close();
        this.resetDatePicker();
        this.toastr.success(
          "Your booking has been succesfully created. You can check in the manage section.",
          "Done!",
          { timeOut: 10000 }
        );
      },
      (resp: any) => {
        this.errors = resp.error.errors;
      }
    );
  }

  selectedDate(value: any, datepicker?: any) {
    this.options.autoUpdateInput = true;
    this.newBooking.startAt = this.helper.getDateFormatedBooking(value.start);
    this.newBooking.endAt = this.helper.getDateFormatedBooking(value.end);
    this.newBooking.days = -value.start.diff(value.end, "days");
    this.newBooking.totalPrice = this.newBooking.days * this.rental.dailyRate;
  }
}
