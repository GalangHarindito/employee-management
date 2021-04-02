import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: any = {};
  username: any;
  display = false;

  constructor(private router: Router) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("currentUser"));
    this.username = this.user.username;
  }

  onLogout() {
    localStorage.removeItem("currentUser");
    this.router.navigateByUrl('login');
  }

  navBar() {
    this.display = !this.display
  }


}
