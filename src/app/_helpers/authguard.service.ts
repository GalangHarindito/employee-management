import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { FetchService } from '../Service/fetch.service'

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {

  constructor(private fetchService:FetchService, private router: Router ) { }

  canActivate() {
    if (!this.fetchService.isLoggedIn()) {
      this.router.navigate(['login']);
      return false;
    } else {
      return true;
    }
  }
}
