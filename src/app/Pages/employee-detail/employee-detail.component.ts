import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FetchService } from "../../Service/fetch.service";
import * as moment from "moment";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-employee-detail",
  templateUrl: "./employee-detail.component.html",
  styleUrls: ["./employee-detail.component.css"],
})
export class EmployeeDetailComponent implements OnInit {
  id: any;
  fetchLogin: any;
  data: any = {};
  firstName: any;
  LastName: any;
  email: any;
  birthDate: any;
  group: any;
  status: any;
  description: any;
  mydate = new Date();
  newDate =
    this.mydate.getFullYear() +
    "-" +
    (this.mydate.getMonth() + 1) +
    "-" +
    this.mydate.getDate();
  maxDate = moment(this.newDate).format("YYYY-MM-DD");
  basicSalary: any;
  basicSalaryInput: any;
  dataChanges: any;
  formData: FormGroup;
  submitted = false;
  addEmployee = false;
  editEmployee = false;
  order: any;
  params: any;
  keysParams: string[];
  pageTitle: string;

  constructor(
    public activatedRoute: ActivatedRoute,
    private FetchService: FetchService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  groups: any = [
    { title: "Goal Keeper", enum: "goalKeeper" },
    { title: "Defender", enum: "defender" },
    { title: "Midfielder", enum: "midfielder" },
    { title: "Forward", enum: "forward" },
  ];

  statusOption: any = [
    { title: "Active Play", enum: true },
    { title: "Retire", enum: false },
  ];

  ngOnInit() {
    this.querryParams();
    //this.id = this.activatedRoute.snapshot.params["id"];
    this.formData = this.fb.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      birthDate: ["", Validators.required],
      basicSalary: ["", Validators.required],
      group: ["", Validators.required],
      status: ["", Validators.required],
      description: ["", Validators.required],
    });
  }

  getEmployee() {
    this.fetchLogin = this.FetchService.getEmployeeById(this.id).subscribe(
      (res) => {
        this.data = res;
        this.changeProperty();
        this.getDate(this.data.birthDate);
        this.getMasking(this.data.basicSalary);
      },
      (error) => {}
    );
  }

  changeProperty() {
    switch (this.data.group) {
      case "Goal Keeper":
        this.data.group = "goalKeeper";
        break;
      case "Midfielder":
        this.data.group = "midfielder";
        break;
      case "Forward":
        this.data.group = "forward";
        break;
      case "Defender":
        this.data.group = "defender";
        break;
    }
    switch (this.data.status) {
      case "Active Play":
        this.data.status = true;
        break;
      case "Retire":
        this.data.status = false;
        break;
    }
}

  get f() {
    return this.formData.controls ;
  }

  putEmployee() {
    this.submitted = true;

    if (this.formData.invalid) {
      return;
    }

    window.alert('Are you sure want to edit this employee?')

    this.dataChanges = {
      id: Number(this.id),
      firstName: this.formData.controls.firstName.value,
      lastName: this.formData.controls.lastName.value,
      email: this.formData.controls.email.value,
      birthDate: moment(this.formData.controls.birthDate.value).format(
        "MM/DD/YYYY"
      ),
      basicSalary: this.normalizeNumber(
        this.formData.controls.basicSalary.value
      ),
      group: this.formData.controls.group.value,
      status: this.formData.controls.status.value,
      description: this.formData.controls.description.value,
    };

    this.fetchLogin = this.FetchService.putEmployeeById(
      this.id,
      this.dataChanges
    ).subscribe(
      (res) => {
        this.router.navigateByUrl("employee-list");
      },
      (error) => {}
    );
  }

  createEmployee() {
    this.submitted = true;

    if (this.formData.invalid) {
      return;
    }

    this.data = {
      firstName: this.formData.controls.firstName.value,
      lastName: this.formData.controls.lastName.value,
      email: this.formData.controls.email.value,
      birthDate: moment(this.formData.controls.birthDate.value).format(
        "MM/DD/YYYY"
      ),
      basicSalary: this.normalizeNumber(this.formData.controls.basicSalary.value),
      group: this.formData.controls.group.value,
      status: this.formData.controls.status.value,
      description: this.formData.controls.description.value,
    };

    this.fetchLogin = this.FetchService.createEmployee(this.data).subscribe(
      (res) => {
        this.router.navigateByUrl("employee-list");
      },
      (error) => {}
    );
  }

  getDate(value) {
    this.birthDate = moment(value).format("YYYY-MM-DD");
  }

  getMasking(value) {
    this.basicSalary = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  normalizeNumber(value) {
    return value.replace(/[^0-9]+/g, "");
  }

  querryParams() {
    this.route.queryParamMap.subscribe((params) => {
      this.order = { ...params.keys, ...params };
    });
    this.params = this.order.params;
    this.id = this.params.id;
    this.keysParams = Object.keys(this.params);
    this.checkParams(this.keysParams);
  }

  checkParams(params) {
    if (params.includes("editEmployee")) {
      this.editEmployee = true;
      this.pageTitle = "Edit Employee";
      return this.getEmployee();
    } else if (params.includes("detail")) {
      this.pageTitle = "Detail Employee";
      return this.getEmployee();
    } else if (params.includes("addEmployee")) {
      this.pageTitle = "Create Employee";
      this.addEmployee = true;
    }
  }
}
