import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  comptitle = "Componente del .ts";

  clickAngular() {
    alert("You've been clicked");
  }



}
