import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { RentalService } from './rental.service';
import { Observable, observable } from 'rxjs';

@Injectable()
export class RentalGuard implements CanActivate {
  constructor(private router: Router, private rentalSrv: RentalService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const rentalId: string = route.params.rentalId;

    return this.rentalSrv
      .verifyUser(rentalId)
      .map(() => {
        return true;
      })
      .catch(() => {
        this.router.navigate(['/rentals']);
        return Observable.of(false);
      });
  }
}
