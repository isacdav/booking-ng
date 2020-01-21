import { Component } from "@angular/core";
import { AuthService } from "src/app/auth/shared/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "bapp-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent {
  constructor(public auth: AuthService, private router: Router) {}

  logout() {
    this.auth.logOut();
    this.router.navigate(["/login"]);
  }

  search(city: string) {
    city
      ? this.router.navigate(["/rentals/" + city + "/homes"])
      : this.router.navigate(["/rentals"]);
  }
}
