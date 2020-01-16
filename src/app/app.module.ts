import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./common/header/header.component";
import { RentalComponent } from "./rental/rental.component";

import { RentalModule } from "./rental/rental.module";
import { AuthComponent } from "./auth/auth.component";
import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";
import { AuthModule } from "./auth/auth.module";

import {
  ToastrModule,
  ToastNoAnimation,
  ToastNoAnimationModule
} from "ngx-toastr";

const routes: Routes = [
  { path: "", redirectTo: "/rentals", pathMatch: "full" }
];

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    RentalModule,
    AuthModule,
    NgbModule.forRoot(),
    ToastNoAnimationModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
