import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  comptitle = "Ts component";

  clickAngular() {
    alert("You've been clicked");
  }
}
