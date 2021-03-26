import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { FetchService } from "../../Service/fetch.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit, OnDestroy {
  hide = true;
  login: FormGroup;
  fetchLogin: Subscription;
  toast =  false;
  submitted= false;
  loader= false;
  default = true;

  constructor(private FetchService: FetchService, private fb: FormBuilder) {}

  ngOnInit() {
    this.login = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  get f() {
    return this.login.controls;
  }

  onSubmit() {
    this.toast = false;
    this.loader = true;
    this.default = false;
    this.submitted = true;
    if (this.login.invalid) {
      this.loader = false;
      this.default = true;
      return;
    }
    this.fetchLogin = this.FetchService.login(this.login.value).subscribe((res) => {
      this.loader = false;
      this.default = true;
    },
    error => {
      error.error.message? this.toast = true :  this.toast = false;
      this.loader = false;
      this.default = true;
    });
  }

  ngOnDestroy() {
    this.fetchLogin.unsubscribe();
}

}
